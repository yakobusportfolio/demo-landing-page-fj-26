import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import Home from "./pages/Home";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ContactPage } from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "portfolio", Component: PortfolioPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);