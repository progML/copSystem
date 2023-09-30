'use client';

import { Button, Layout, notification, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import List from "./List";
import { useAppContext } from "contexts/AppContext";
import { STORAGE_KEYS } from "constants/storage";
import { useMutation } from "@tanstack/react-query";
import Api from "services/api";
import styles from './ExamList.scss';

export default function ExamList() {
  const { isEntitled, setIsEntitled } = useAppContext();

  function handleLogoutSuccess() {
    setIsEntitled(false);
  }

  function handleLogoutError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationKey: ['adminLogout'],
    mutationFn: Api.adminLogout,
    onError: handleLogoutError,
    onSuccess: handleLogoutSuccess,
  });

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тесты</Typography.Title>
        <List />
        {isEntitled && (
          <Button styles={styles.addButton}>
            <Link to={ROUTES.CREATE}>
              <span>Добавить тест</span>
            </Link>
          </Button>
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        {isEntitled ? (
          <Button onClick={() => logOut()} loading={isLoggingOut}>
            Выйти
          </Button>
        ) : (
          <Button>
            <Link to={ROUTES.ADMIN_AUTH}>
              <span>Вход преподавателя</span>
            </Link>
          </Button>
        )}
      </Layout.Sider>
    </Layout>
  );
}
