'use client';

import { Button, Layout, Modal, notification, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { useMemo } from "react";
import ExamDetail from "components/ExamDetail";
import type { Exam, ExamPayload } from "types/exam";
import { normalizeAnswers, normalizeExamPayload } from "utils/normalize";
import Loader from "components/Loader";
import { ROUTES } from "constants/routes";
import { useExamHeader } from "hooks/useExamHeader";

export default function ExamPass() {
  const navigate = useNavigate();

  const examId = Number(useParams().examId);
  const attemptId = Number(useParams().attemptId);

  const { data: examDetails, isFetching: isFetchingDetails } = useQuery<ExamPayload>({
    queryKey: ['getExamDetails', examId],
    queryFn: () => Api.getExamDetails(examId),
  });

  useExamHeader({ examName: examDetails?.name, isFetchingName: false });

  const normalizedDetails = useMemo<Exam | undefined>(
    () => examDetails && normalizeExamPayload({ data: examDetails }),
    [examDetails]
  );

  function handlePassSuccess() {
    navigate(`${ROUTES.RESULT}/${attemptId}`);
  }

  function handlePassError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: passExam, isLoading: isPassingExam } = useMutation({
    mutationKey: ['passExam', attemptId],
    mutationFn: Api.passExam,
    onError: handlePassError,
    onSuccess: handlePassSuccess,
  });

  function handleFinishExam(data: Exam) {
    Modal.warning({
      title: 'Вы точно хотите завершить тест?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => passExam({ attemptId, data: normalizeAnswers(data) }),
      okButtonProps: {
        loading: isPassingExam,
      },
      okCancel: true,
    });
  }

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Прохождение теста</Typography.Title>
        {isFetchingDetails || !normalizedDetails ? (
          <Loader />
        ) : (
          <ExamDetail
            isDisplayingTitle={false}
            initialValues={normalizedDetails}
            onSave={handleFinishExam}
            isSaving={isPassingExam}
          />
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        {/* @ts-ignore */}
        <Button htmlType="submit" form='exam' loading={isPassingExam} disabled={isPassingExam}>
          Завершить тест
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
