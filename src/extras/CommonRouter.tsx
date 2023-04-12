import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import home_page_routes from '../pages/Home/extras/HomeRoutes';
import divisions_page_routes from '../pages/Divisions/extras/DivisionsRoutes';
import fr_page_routes from '../pages/FR/extras/FRRoutes';
import hr_page_routes from '../pages/HR/extras/HRRoutes';
import iro_page_routes from '../pages/IRO/extras/IRORoutes';
import workers_page_routes from '../pages/Workers/extras/WorkersRoutes';
const router = createBrowserRouter(
  ([] as RouteObject[]).concat(
    ...[
      divisions_page_routes,
      fr_page_routes,
      home_page_routes,
      hr_page_routes,
      iro_page_routes,
      workers_page_routes,
    ].map((module_route) =>
      module_route.pages.map((page) => ({
        path: module_route.base + page.path,
        element: page.element,
      }))
    )
  )
);
const Router = () => <RouterProvider router={router} />;

export default Router;
