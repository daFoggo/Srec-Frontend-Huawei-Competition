import { createBrowserRouter, RouteObject } from "react-router-dom";
import routes from "./routerConfig";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import SignIn from "@/pages/SignIn";
import Profile from "@/pages/Profile";
import RecruiterLayout from "@/layouts/RecruiterLayout";
import JobDescriptions from "@/pages/JobDescriptions";
import CandidateLayout from "@/layouts/CandidateLayout";
import CandidateRanking from "@/pages/CandidateRanking";
import Dashboard from "@/pages/Dashboard";
import CandidateSummary from "@/pages/CandidateSummary";
import Introduction from "@/pages/Introduction";
import PersonalityTest from "@/pages/PersonalityTest";
import CodeAssessment from "@/pages/CodeAssessment";
import VirtualInterview from "@/pages/VirtualInterview";
import ThankYou from "@/pages/ThankYou";

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
        path: routes.codeAssessment,
        element: <CodeAssessment />,
      },
      {
        path: routes.personalityTest,
        element: <PersonalityTest />,
      },
      {
        path: routes.virtualInterview,
        element: <VirtualInterview />,
      },
      {
        path: routes.thankYou,
        element: <ThankYou />,
      },
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
