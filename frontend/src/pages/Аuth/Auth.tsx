'use client';

import { Button, Form, Input, Layout, notification, Typography } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { requiredRule } from 'constants/rules';
import styles from './Auth.scss';
import { useMutation } from "@tanstack/react-query";
import Api from "services/api";
import type { UserCredentials } from "types/credentials";
import { useExamHeader } from "hooks/useExamHeader";
import { AxiosError } from "axios";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const examId = Number(searchParams.get('examId'));
  useExamHeader({ examId });

  function handleAuthSuccess(attemptId: number) {
    navigate(`${ROUTES.PASS.replace(':examId', examId.toString())}/${attemptId}`);
  }

  function handleAuthError(error: AxiosError<{message: string}>) {
    notification.error({ message: error?.response?.data?.message });
  }

  const { mutate: checkAttempts, isLoading: isCheckingAttempts } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: UserCredentials) => Api.checkAttempts({ examId, data }),
    onError: handleAuthError,
    onSuccess: handleAuthSuccess,
  });


  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Вход для обучаемого</Typography.Title>
        <Form
          initialValues={{ name: '', patronymic: '', surname: '', groupNumber: '' }}
          name="auth"
          onFinish={checkAttempts}
        >
          <div className={styles.formItemWrapper}>
            <Form.Item name="surname" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Фамилия" />
            </Form.Item>
            <Form.Item name="name" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Имя" />
            </Form.Item>
            <Form.Item name="patronymic" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Отчество" />
            </Form.Item>
            <Form.Item name="groupNumber" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Номер группы" />
            </Form.Item>
          </div>
          <Button htmlType="submit">Начать тест</Button>
        </Form>
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
