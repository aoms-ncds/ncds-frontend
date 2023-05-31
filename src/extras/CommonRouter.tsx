import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import React from 'react';
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

const router = createBrowserRouter(
  ([] as RouteObject[]).concat(
    ...allModuleRoutes.map((moduleRoute) =>
      moduleRoute.pages.map((page) => ({
        path: moduleRoute.base + page.path,
        element: page.element,
      })),
    ),
  ),
);
const Router = () => <RouterProvider router={router} />;

export default Router;
