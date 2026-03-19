import { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import divisionsPageRoutes from '../modules/Divisions/extras/DivisionsRoutes';
import frPageRoutes from '../modules/FR/extras/FRRoutes';
import homePageRoutes from '../modules/Home/extras/HomeRoutes';
import hrPageRoutes from '../modules/HR/extras/HRRoutes';
import iroPageRoutes from '../modules/IRO/extras/IRORoutes';
import workersPageRoutes from '../modules/Workers/extras/WorkersRoutes';
// import testPageRoutes from '../modules/Tests/extras/TestRoutes';
// import samplesPageRoutes from '../modules/Sample/extras/SampleRoutes';
import { useAuth } from '../hooks/Authentication';
import applicationRoutes from '../modules/Applications/extras/ApplicationRoutes';
import LoadingPage from '../modules/Common/LoadingPage';
import notificationPageRoutes from '../modules/Notification/extras/NotificationRouter';
import settingsRoutes from '../modules/Settings/extras/SettingsRouter';
import testsPageRoutes from '../modules/Tests/extras/TestRoutes';
import PermissionChecks from '../modules/User/components/PermissionChecks';
import UserServices from '../modules/User/extras/UserServices';
import usersPageRoutes from '../modules/User/extras/UsersRoutes';
import UnauthorizedPage from '../modules/User/UnauthorizedPage';
import customFrIroRoute from '../modules/CustomReport/extras/CustomFR-IRO-Routes';
import AnalyticsPageRoutes from '../modules/Analytics/extras/AnalyticsRoutes';

export const allModuleRoutes = [
  homePageRoutes,
  divisionsPageRoutes,
  workersPageRoutes,
  frPageRoutes,
  iroPageRoutes,
  // AnalyticsPageRoutes,
  applicationRoutes,
  customFrIroRoute,
  hrPageRoutes,
  settingsRoutes,
  usersPageRoutes,
  // testPageRoutes,
  testsPageRoutes,
  // samplesPageRoutes,
  notificationPageRoutes,

];
const Router = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    UserServices.getMe()
    .then((res) => {
      setUser(res.data);
    })
    .catch((error) => {
      setUser(false);
    });
  }, []);

  const router = createBrowserRouter(
    ([] as RouteObject[]).concat(
      ...allModuleRoutes.map((moduleRoute) =>
        moduleRoute.pages.map((page) => ({
          path: moduleRoute.base + page.path,
          element: !page.private ?
            page.element :
            (
              user === null ?
                <LoadingPage /> :
                (
                  user === false ?
                    <Navigate to={`/login?redirect=${window.location.pathname}`} /> :
                    page.requiredAccessRights ?
                      <PermissionChecks
                        permissions={page.requiredAccessRights}
                        granted={page.element}
                        denied={(missingPermissions) => <UnauthorizedPage {...{ missingPermissions }} />}
                      /> :
                      page.element
                )
            ),
          // element: page.element,
        })),
      ),
    ),
  );
  return <RouterProvider router={router} />;
};

export default Router;
