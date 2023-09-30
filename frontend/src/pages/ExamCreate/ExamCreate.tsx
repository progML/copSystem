'use client';

import { Button, Layout, notification, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useAppContext } from "contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import Api from "services/api";
import { useEffect } from "react";
import ExamDetail from "components/ExamDetail";
import { EMPTY_EXAM_DETAIL } from "constants/exam";
import type { Exam } from "types/exam";
import { normalizeExamData } from "utils/normalize";

export default function ExamCreate() {
  const { isEntitled } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEntitled) navigate(ROUTES.EXAM_LIST);
  }, [isEntitled]);

  function handleCreateSuccess() {
    navigate(ROUTES.EXAM_LIST);
  }

  function handleCreateError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: createExam, isLoading: isCreatingExam } = useMutation({
    mutationKey: ['createExam'],
    mutationFn: Api.createExam,
    onError: handleCreateError,
    onSuccess: handleCreateSuccess,
  });

  function handleSave(data: Exam) {
    createExam(normalizeExamData(data));
  }

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Конструктор теста</Typography.Title>
        <ExamDetail
          initialValues={EMPTY_EXAM_DETAIL}
          onSave={handleSave}
          isSaving={isCreatingExam}
          isEditable
        />
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
