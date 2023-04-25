import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import homePageRoutes from '../modules/Home/extras/HomeRoutes';
import divisionsPageRoutes from '../modules/Divisions/extras/DivisionsRoutes';
import frPageRoutes from '../modules/FR/extras/FRRoutes';
import hrPageRoutes from '../modules/HR/extras/HRRoutes';
import iroPageRoutes from '../modules/IRO/extras/IRORoutes';
import workersPageRoutes from '../modules/Workers/extras/WorkersRoutes';
import testsPageRoutes from '../modules/Tests/extras/TestsRoutes';
import apppageRoutes from '../modules/Applications/extras/ApplicationsRoutes';

export const getAllModuleRoutes = [
  homePageRoutes,
  hrPageRoutes,
  divisionsPageRoutes,
  workersPageRoutes,
  frPageRoutes,
  iroPageRoutes,
  testsPageRoutes,
  apppageRoutes,

];

const router = createBrowserRouter(
  ([] as RouteObject[]).concat(
    ...getAllModuleRoutes.map((moduleRoute) =>
      moduleRoute.pages.map((page) => ({
        path: moduleRoute.base + page.path,
        element: page.element,
      })),
    ),
  ),
);
const Router = () => <RouterProvider router={router} />;

export default Router;
