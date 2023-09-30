import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout';
import { FileWatcherPage, MainPage, SingInPage, WorkspacesPage } from './pages';
import { PATHNAMES } from './_const';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHNAMES.dashboard} element={<MainPage />} />
        <Route path={PATHNAMES.validation} element={null} />
      </Route>
      <Route path={PATHNAMES.login} element={<SingInPage />} />
      <Route path=":id" element={<FileWatcherPage />} />
    </Routes>
  );
}

export default AppRoutes;
