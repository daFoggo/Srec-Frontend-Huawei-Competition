import { createBrowserRouter, RouteObject } from "react-router-dom";
import routes from "./routerConfig";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import SignIn from "@/pages/SignIn/SignIn";
import Profile from "@/pages/Profile/Profile";
import RecruiterLayout from "@/layouts/RecruiterLayout/RecruiterLayout";
import JobDescriptions from "@/pages/JobDescriptions/JobDescriptions";
import CandidateLayout from "@/layouts/CandidateLayout/CandidateLayout";
import CandidateRanking from "@/pages/CandidateRanking/CandidateRanking";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CandidateSummary from "@/pages/CandidateSummary/CandidateSummary";
import Introduction from "@/pages/Introduction/Introduction";
import PersonalityTest from "@/pages/PersonalityTest/PersonalityTest";

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
      },
    ],
  },
  {
    path: "/recruiter",
    element: <RecruiterLayout />,
    children: [
      {
        path: routes.jobDescriptions,
        element: <JobDescriptions />,
      },
      {
        path: routes.candidateRanking + "/:jobId",
        element: <CandidateRanking />,
      },
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
      {
        path: routes.candidateSummary + "/:candidateId",
        element: <CandidateSummary />,
      },
    ],
  },
  {
    path: "/candidate",
    element: <CandidateLayout />,
    children: [
      {
        path: routes.introduction,
        element: <Introduction />,
      },
      {
        path: routes.personalityTest,
        element: <PersonalityTest />,
      },
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
