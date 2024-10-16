import { createBrowserRouter, RouteObject } from "react-router-dom";
import routes from "./routerConfig";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";  
import SignIn from "@/pages/SignIn/SignIn";
import Profile from "@/pages/Profile/Profile";

const routeLayout: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.about,
        element: <About />,
      },
      {
        path: routes.contact,
        element: <Contact />,
      },
      {
        path: routes.signIn,
        element: <SignIn />,
      },
      {
        path: routes.profile,
        element: <Profile />,
      }
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
