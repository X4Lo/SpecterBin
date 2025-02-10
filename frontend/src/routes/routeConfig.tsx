import React from "react";
import LoginPage from "@/pages/LoginPage";

import { Navigate } from "react-router-dom";
import NewPastePage from "@/pages/NewPastePage";
import MyPastesPage from "@/pages/MyPastesPage";
import PasteViewPage from "@/pages/PasteViewPage";
import NotFoundPage from "@/pages/NotFoundPage";
import NotAvailablePage from "@/pages/NotAvailablePage";

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
    isProtected: false,
  },
  { path: "/new", component: NewPastePage, isProtected: false },
  { path: "/my-pastes", component: MyPastesPage, isProtected: true },
  { path: "/not-found", component: NotFoundPage, isProtected: false },
  { path: "/not-available", component: NotAvailablePage, isProtected: false },
  { path: "/:pasteId", component: PasteViewPage, isProtected: false },
  { path: "/*", component: NotFoundPage, isProtected: false },
];

export default routes;
