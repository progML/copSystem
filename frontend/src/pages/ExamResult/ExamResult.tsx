'use client';

import { Button, Layout, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import type { AttemptDetails } from "types/attempt";
import GradeDetails from "components/GradeDetails";
import { useExamHeader } from "hooks/useExamHeader";
import type { ExamPayload } from "types/exam";

export default function ExamResult() {
  const attemptId = Number(useParams().attemptId);

  const { data: attemptDetails, isFetching } = useQuery<{ attempt: AttemptDetails, exam: ExamPayload }>({
    queryKey: ['attemptDetails', attemptId],
    queryFn: () => Api.getAttemptDetails(attemptId),
  });
  useExamHeader({ examName: attemptDetails?.exam?.name, isFetchingName: false });

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тест завершен</Typography.Title>
        {isFetching || !attemptDetails ? (
          <Loader />
        ) : (
          <GradeDetails attemptDetails={attemptDetails?.attempt} />
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>На главную</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
