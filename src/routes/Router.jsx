import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkflowListingPage from "../pages/WorkflowListingPage.jsx";
import ExecutionLogListingPage from "../pages/ExecutionLogListingPage.jsx";
import WorkflowBuilder from "../pages/WorkflowBuilder.jsx";
import WorkflowExecutionPage from "../pages/WorkflowExecutionPage.jsx";
import ExecutionLogDetailPage from "../pages/ExecutionLogDetailPage.jsx";

const routes = [
  { path: "/", element: <WorkflowListingPage /> },
  { path: "/execution-log", element: <ExecutionLogListingPage /> },
  {
    path: "/execution-log/:workflowId/:taskId",
    element: <ExecutionLogDetailPage />,
  },
  { path: "/builder", element: <WorkflowBuilder /> },
  { path: "/builder/:workflowId", element: <WorkflowExecutionPage /> },
];

const AppRouter = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

export default AppRouter;
