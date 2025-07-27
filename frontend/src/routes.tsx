import ComingSoon from "./Pages/ComingSoon";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DocGen from "./Pages/DocGen/DocGen";
import Home from "./Pages/Home";
import Secrets from "./Pages/Secrets";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/doc-gen",
    element: <DocGen />,
  },
  {
    path: "/secrets",
    element: <Secrets />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  { path: "/logs", element: <ComingSoon /> },
  { path: "/domains", element: <ComingSoon /> },
  { path: "/billing", element: <ComingSoon /> },
  { path: "/plugins", element: <ComingSoon /> },
  { path: "/support", element: <ComingSoon /> },
];
