import React from "react";
import LoginPage from "@/pages/LoginPage";

import { Navigate } from "react-router-dom";
import NewPastePage from "@/pages/NewPastePage";
import MyPastesPage from "@/pages/MyPastesPage";

interface Route {
  path: string;
  component: React.FC;
  isProtected: boolean;
}

const routes: Route[] = [
  { path: "/login", component: LoginPage, isProtected: false },
  {
    path: "/",
    component: () => <Navigate to="/new" replace />,
    isProtected: true,
  },
  { path: "/new", component: NewPastePage, isProtected: false },
  { path: "/my-pastes", component: MyPastesPage, isProtected: false },
];

export default routes;
