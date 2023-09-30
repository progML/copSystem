import { ReactElement } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AppWrapper from 'components/AppWrapper';
import { ROUTES } from 'constants/routes';
import AdminAuth from 'pages/AdminAuth';
import ExamList from 'pages/ExamList';
import Auth from "pages/Аuth";
import ExamCreate from "pages/ExamCreate";
import ExamEdit from "pages/ExamEdit";
import ExamPass from "pages/ExamPass";
import ExamResult from "pages/ExamResult";
import AttemptList from "pages/AttemptList";
import AttemptDetails from "pages/AttemptDetails";

const routes: RouteObject[] = [
  {
    element: <AppWrapper />,
    children: [
      { path: ROUTES.EXAM_LIST, element: <ExamList /> },
      { path: ROUTES.ADMIN_AUTH, element: <AdminAuth /> },
      { path: ROUTES.AUTH, element: <Auth /> },
      { path: ROUTES.CREATE, element: <ExamCreate /> },
      { path: `${ROUTES.EDIT}/:examId`, element: <ExamEdit /> },
      { path: `${ROUTES.PASS}/:attemptId`, element: <ExamPass /> },
      { path: `${ROUTES.RESULT}/:attemptId`, element: <ExamResult /> },
      { path: ROUTES.ATTEMPT_LIST, element: <AttemptList /> },
      { path: `${ROUTES.ATTEMPT_DETAILS}/:attemptId`, element: <AttemptDetails /> },
    ],
  },
];

export default function Router(): ReactElement | null {
  return useRoutes(routes);
}
