import { ThemeProvider } from 'styled-components';
import { NA_DARK } from '@3divi/baseui';
import NotificationsWidget from './components/widgets/notifications/Notifications.widget';
import AppPageManager from './components/modules/app-page-manager/app-page-manager.module';
import AppRoutes from './app-routes';
import { GlobalStyle } from './styles/index-styled-components';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={NA_DARK}>
      <GlobalStyle />
      <AppPageManager />
      <NotificationsWidget />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
