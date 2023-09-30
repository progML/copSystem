'use client';

import { Button, Layout, Modal, Table, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { CloseOutlined, FileSearchOutlined } from "@ant-design/icons";
import type { AttemptDetails } from "types/attempt";
import { ROUTES } from "constants/routes";
import styles from './AttemptList.scss';
import cx from "classnames";
import Loader from "components/Loader";
import { useCallback } from "react";
import { getGrade } from "utils/grade";
import { ATTEMPT_STATUSES } from "constants/exam";

export default function AttemptList() {
  const examId = Number(useParams().examId);

  const {
    data: attemptHistory,
    isFetching: isFetchingHistory,
    refetch: refetchAttemptHistory,
  } = useQuery<{
    name: string,
    attempts: AttemptDetails[]
  }>({
    queryKey: ['getAttemptList', examId],
    queryFn: () => Api.getAttemptHistory(examId),
  });

  const renderAnswerStats = useCallback(
    (record: AttemptDetails) => `${Number(record.rightCount)} из ${Number(record.totalCount)}`,
    []
  );

  const renderStatus = useCallback((record: AttemptDetails) => ATTEMPT_STATUSES[record.attemptStatus], []);

  const renderGrade = useCallback(
    (record: AttemptDetails) => {
      const grade = getGrade(record.rightCount / record.totalCount);
      return (
        <div className={cx(styles.grade, styles[grade.key.toLowerCase()])}>
          <span>{grade.text}</span>
        </div>
      );
    }, []
  );

  const { mutateAsync: deleteAttempt, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete'],
    mutationFn: Api.deleteAttempt,
  });

  async function handleDelete(attemptId?: number) {
    await deleteAttempt(attemptId);
    await refetchAttemptHistory();
  }

  function showModal(attemptId?: number) {
    Modal.warning({
      title: 'Обнулить попытку?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => handleDelete(attemptId),
      okButtonProps: {
        loading: isDeleting,
      },
      okCancel: true,
    });
  }

  return (
    <Layout hasSider className={cx(styles.content, "fullHeight")}>
      <Layout.Content className={styles.title}>
        <Typography.Title>{attemptHistory?.name}</Typography.Title>
      </Layout.Content>
      <Layout.Sider width={500} className={styles.side}>
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
      <Layout.Footer className={styles.tableWrapper}>
        <Table
          showSorterTooltip={false}
          rowKey="attemptId"
          locale={{ emptyText: "Тест ещё не был пройден" }}
          className={styles.attemptList}
          dataSource={attemptHistory?.attempts}
          pagination={false}
          loading={{ spinning: isFetchingHistory, indicator: <Loader /> }}
          scroll={{ y: 360 }}
        >
          <Table.Column
            title="Фамилия"
            dataIndex="surname"
            width={190}
            ellipsis
          />
          <Table.Column
            title="Имя"
            dataIndex="name"
            width={190}
            ellipsis
          />
          <Table.Column
            title="Отчество"
            dataIndex="patronymic"
            width={190}
            ellipsis
          />
          <Table.Column
            title="Номер группы"
            dataIndex="groupNumber"
            width={220}
            ellipsis
          />
          <Table.Column
            title="Статус"
            render={renderStatus}
            width={200}
            ellipsis
          />
          <Table.Column
            title="Верных ответов"
            render={renderAnswerStats}
            width={200}
          />
          <Table.Column
            title="Оценка"
            render={renderGrade}
            width={320}
          />
          <Table.Column
            width={80}
            render={(record) => (
              <div className={styles.controlsWrapper} title='Посмотреть детали'>
                <Button>
                  <Link to={`${ROUTES.ATTEMPT_DETAILS.replace(':examId', examId.toString())}/${record.attemptId}`}>
                    <FileSearchOutlined />
                  </Link>
                </Button>
              </div>
            )}
          />
          <Table.Column
            width={80}
            render={(record) => (
              <div className={styles.controlsWrapper} title='Удалить попытку'>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => showModal(record.attemptId)}
                />
              </div>
            )}
          />
        </Table>
      </Layout.Footer>
    </Layout>
  );
}
