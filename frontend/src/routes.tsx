import ComingSoon from "./Pages/ComingSoon";
import Dashboard from "./Pages/Dashboard/Dashboard";
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
