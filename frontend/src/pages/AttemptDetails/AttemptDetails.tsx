'use client';

import { Button, Layout, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from "constants/routes";
import { useQuery } from "@tanstack/react-query";
import type { AttemptDetails } from "types/attempt";
import Api from "services/api";
import type { ExamPayload } from "types/exam";
import { useMemo } from "react";
import { Exam } from "types/exam";
import { normalizeExamPayload } from "utils/normalize";
import ExamDetail from "components/ExamDetail";
import Loader from "components/Loader";
import styles from './AttemptDetails.scss';
import GradeDetails from "components/GradeDetails";
import { ATTEMPT_STATUSES } from "constants/exam";

export default function AttemptDetails() {
  const examId = Number(useParams().examId);
  const attemptId = Number(useParams().attemptId);

  const { data: attemptDetails, isFetching: isFetchingDetails } = useQuery<{
    attempt: AttemptDetails,
    exam: ExamPayload
  }>({
    queryKey: ['attemptDetails', attemptId],
    queryFn: () => Api.getAttemptDetails(attemptId),
  });

  const normalizedDetails = useMemo<Exam | undefined>(
    () => attemptDetails && normalizeExamPayload({
      data: attemptDetails.exam,
      getAnswerSelection: (index) => attemptDetails?.attempt?.userAnswers?.[index]
    }),
    [attemptDetails]
  );

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Журнал</Typography.Title>
        {isFetchingDetails || !attemptDetails || !normalizedDetails ? (
          <Loader />
        ) : (
          <>
            <div className={styles.section}>
              <Typography.Text>Фамилия:</Typography.Text>
              <Typography.Text className={styles.result}>
                {attemptDetails.attempt.surname}
              </Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Имя:</Typography.Text>
              <Typography.Text className={styles.result}>
                {attemptDetails.attempt.name}
              </Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Отчество:</Typography.Text>
              <Typography.Text className={styles.result}>
                {attemptDetails.attempt.patronymic}
              </Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Номер группы:</Typography.Text>
              <Typography.Text className={styles.result}>
                {attemptDetails.attempt.groupNumber}
              </Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Название тест:</Typography.Text>
              <Typography.Text className={styles.result}>
                {attemptDetails.exam.name}
              </Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Статус:</Typography.Text>
              <Typography.Text className={styles.result}>
                {ATTEMPT_STATUSES[attemptDetails.attempt.attemptStatus]}
              </Typography.Text>
            </div>
            <GradeDetails attemptDetails={attemptDetails.attempt} />
            <ExamDetail
              initialValues={normalizedDetails}
              isSelectable={false}
              isDisplayingTitle={false}
              userAnswers={attemptDetails.attempt.userAnswers}
            />
          </>
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={`${ROUTES.ATTEMPT_LIST.replace(':examId', examId.toString())}`}>
            <span>Вернуться к журналу</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
