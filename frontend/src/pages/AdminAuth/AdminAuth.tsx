'use client';

import { Button, Form, Input, Layout, notification, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { requiredRule } from 'constants/rules';
import styles from './AdminAuth.scss';
import { useMutation } from "@tanstack/react-query";
import Api from "services/api";
import { useAppContext } from "contexts/AppContext";

export default function AdminAuth() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setIsEntitled } = useAppContext();

  function handleAuthSuccess() {
    setIsEntitled(true);
    navigate(ROUTES.EXAM_LIST);
  }

  function handleAuthError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: signIn, isLoading: isSigningIn } = useMutation({
    mutationKey: ['adminAuth'],
    mutationFn: Api.adminAuth,
    onError: handleAuthError,
    onSuccess: handleAuthSuccess,
  });

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Вход для преподавателя</Typography.Title>
        <Form form={form} initialValues={{ username: '', password: '' }} name="adminAuth" onFinish={signIn}>
          <div className={styles.formItemWrapper}>
            <Form.Item name="username" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Логин" />
            </Form.Item>
            <Form.Item name="password" rules={[requiredRule]}>
              <Input.Password bordered={false} placeholder="Пароль" />
            </Form.Item>
          </div>
          <Button htmlType="submit" loading={isSigningIn}>Войти</Button>
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
