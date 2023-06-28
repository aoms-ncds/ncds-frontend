import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import React, { useEffect } from 'react';
import homePageRoutes from '../modules/Home/extras/HomeRoutes';
import divisionsPageRoutes from '../modules/Divisions/extras/DivisionsRoutes';
import frPageRoutes from '../modules/FR/extras/FRRoutes';
import hrPageRoutes from '../modules/HR/extras/HRRoutes';
import iroPageRoutes from '../modules/IRO/extras/IRORoutes';
import workersPageRoutes from '../modules/Workers/extras/WorkersRoutes';
import testPageRoutes from '../modules/Tests/extras/TestRoutes';
import samplesPageRoutes from '../modules/Sample/extras/SampleRoutes';
import applicationRoutes from '../modules/Applications/extras/ApplicationRoutes';
import usersPageRoutes from '../modules/User/extras/UsersRoutes';
import { useAuth } from '../hooks/Authentication';
import LoadingPage from '../modules/Common/LoadingPage';
import settingsRoutes from '../modules/Settings/extras/SettingsRouter';
import UserServices from '../modules/User/extras/UserServices';
import PermissionChecks from '../modules/User/components/PermissionChecks';
import UnauthorizedPage from '../modules/User/UnauthorizedPage';
import notificationPageRoutes from '../modules/Notification/extras/NotificationRouter';

export const allModuleRoutes = [
  homePageRoutes,
  hrPageRoutes,
  divisionsPageRoutes,
  workersPageRoutes,
  usersPageRoutes,
  frPageRoutes,
  iroPageRoutes,
  settingsRoutes,
  // testPageRoutes,
  // samplesPageRoutes,
  applicationRoutes,
  // notificationPageRoutes,

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
