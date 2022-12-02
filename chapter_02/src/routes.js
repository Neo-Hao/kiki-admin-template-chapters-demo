import { Suspense, Fragment, lazy } from "react";
import { Route, Navigate } from "react-router-dom";
import DashboardLayout from "layouts/DashboardLayout";
import MainLayout from "layouts/MainLayout";
import LandingView from "views/LandingView";
import LoadingScreen from "components/LoadingScreen";

export const renderRoutes = (routes = []) => {
  return routes.map((route, i) => {
    // routes with children: may or may not have a path
    if (route.routes) {
      let path = route.path ? route.path : false;
      let Layout = route.layout ? route.layout : Fragment;

      return (
        <Route key={i + path} path={path} element={<Layout />}>
          {renderRoutes(route.routes)}
        </Route>
      );
    } else {
      // routes without children
      let Component = route.component;
      let path = route.path ? route.path : false;
      let index = route.path ? false : true;

      if (route.layout) {
        // parent route: with a layout but no children
        let Layout = route.layout;
        return (
          <Route key={i + path} element={<Layout />}>
            <Route
              path={path}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <Component />
                </Suspense>
              }
            />
          </Route>
        );
      } else {
        // child route: index route or with a path, or
        // parent route: with no children or layout
        return (
          <Route
            key={i + path}
            path={path}
            index={index}
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Component />
              </Suspense>
            }
          />
        );
      }
    }
  });
};

const routes = [
  {
    layout: MainLayout,
    routes: [
      {
        path: "/",
        component: LandingView,
      },
      {
        path: "/404",
        component: lazy(() => import("views/NotFoundView")),
      },
      {
        path: "/403",
        component: lazy(() => import("views/NotAuthorizedView")),
      },
      {
        path: "/login",
        component: lazy(() => import("views/LoginView")),
      },
      {
        path: "/register",
        component: lazy(() => import("views/RegisterView")),
      },
    ],
  },
  {
    layout: DashboardLayout,
    routes: [
      {
        path: "/home",
        component: lazy(() => import("views/DashboardView")),
      },
      {
        path: "/account",
        component: lazy(() => import("views/AccountView")),
      },
    ],
  },
  {
    path: "/projects",
    layout: DashboardLayout,
    routes: [
      {
        component: lazy(() => import("views/ProjectsView")),
      },
      {
        path: "create",
        component: lazy(() => import("views/ProjectCreateView")),
      },
      {
        path: ":projectId",
        component: lazy(() => import("views/ProjectView")),
      },
    ],
  },
  {
    path: "*",
    component: () => <Navigate to="/404" />,
  },
];

export default routes;
