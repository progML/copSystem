'use client';

import { Button, Layout, notification, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useAppContext } from "contexts/AppContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { useEffect, useMemo } from "react";
import ExamDetail from "components/ExamDetail";
import type { Exam, ExamPayload } from "types/exam";
import { normalizeExamData, normalizeExamPayload } from "utils/normalize";
import Loader from "components/Loader";
import { EMPTY_EXAM_DETAIL } from "constants/exam";

export default function ExamEdit() {
  const { isEntitled } = useAppContext();
  const navigate = useNavigate();

  const examId = Number(useParams().examId);

  const { data: examDetails, isFetching: isFetchingDetails } = useQuery<ExamPayload>({
    queryKey: ['getExamDetails', examId],
    queryFn: () => Api.getExamDetails(examId),
  });

  const normalizedDetails = useMemo<Exam | undefined>(
    () => examDetails && normalizeExamPayload({
      data: examDetails,
      getAnswerSelection: (index) => examDetails?.questions?.[index].rightAnswer
    }),
    [examDetails]
  );

  useEffect(() => {
    if (!isEntitled) navigate(ROUTES.EXAM_LIST);
  }, [isEntitled]);

  function handleEditSuccess() {
    notification.success({ message: 'Изменения сохранены' });
  }

  function handleEditError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: editExam, isLoading: isEditingExam } = useMutation({
    mutationKey: ['editExam', examId],
    mutationFn: Api.editExam,
    onError: handleEditError,
    onSuccess: handleEditSuccess,
  });

  function handleSave(data: Exam) {
    editExam({ id: examId, data: normalizeExamData(data) });
  }

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Редактирование теста</Typography.Title>
        {isFetchingDetails || !normalizedDetails ? (
          <Loader />
        ) : (
          <ExamDetail
            initialValues={normalizedDetails}
            onSave={handleSave}
            isSaving={isEditingExam}
            isEditable
          />
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
