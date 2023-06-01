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

export const allModuleRoutes = [
  homePageRoutes,
  hrPageRoutes,
  divisionsPageRoutes,
  workersPageRoutes,
  usersPageRoutes,
  frPageRoutes,
  iroPageRoutes,
  testPageRoutes,
  samplesPageRoutes,
  applicationRoutes,
];
const Router = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      localStorage.getItem('userData') ?
        setUser(JSON.parse(localStorage.getItem('userData') as string)) :
        setUser(false);
    }, 500);
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
                    <Navigate to={`/login?redirect=${moduleRoute.base}${page.path}`} /> :
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
