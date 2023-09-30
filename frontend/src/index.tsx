import { App, ConfigProvider as AntdConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ANTD_THEME } from 'styles/antdTheme';
import Router from './Router';
import 'styles/global.scss';
import { AppContextProvider } from "contexts/AppContext";
import { BASE_PATH } from "constants/routes";

const rootNode = document.getElementById('root');

const QUERY_CLIENT_DEFAULT_OPTIONS = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: true,
  },
};

if (rootNode) {
  const queryClient = new QueryClient({
    defaultOptions: QUERY_CLIENT_DEFAULT_OPTIONS,
  });

  createRoot(rootNode).render(
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <BrowserRouter basename={BASE_PATH}>
          <AntdConfigProvider theme={ANTD_THEME}>
            <App>
              <Router />
            </App>
          </AntdConfigProvider>
        </BrowserRouter>
      </AppContextProvider>
    </QueryClientProvider>
  );
}
