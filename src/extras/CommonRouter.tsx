import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import homePageRoutes from '../pages/Home/extras/HomeRoutes';
import divisionsPageRoutes from '../pages/Divisions/extras/DivisionsRoutes';
import frPageRoutes from '../pages/FR/extras/FRRoutes';
import hrPageRoutes from '../pages/HR/extras/HRRoutes';
import iroPageRoutes from '../pages/IRO/extras/IRORoutes';
import workersPageRoutes from '../pages/Workers/extras/WorkersRoutes';
const router = createBrowserRouter(
  ([] as RouteObject[]).concat(
    ...[
      divisionsPageRoutes,
      frPageRoutes,
      homePageRoutes,
      hrPageRoutes,
      iroPageRoutes,
      workersPageRoutes,
    ].map((moduleRoute) =>
      moduleRoute.pages.map((page) => ({
        path: moduleRoute.base + page.path,
        element: page.element,
      })),
    ),
  ),
);
const Router = () => <RouterProvider router={router} />;

export default Router;
