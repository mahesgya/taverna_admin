import "./index.css";
import Routess from "./routes";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter, useRoutes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import useTokenRefresh from "./hooks/refresh";

const root = ReactDOM.createRoot(document.getElementById("root"));

function AppRoutes() {
  useTokenRefresh();
  const element = useRoutes(Routess);
  return element;
}

root.render(
  <BrowserRouter>
    <ScrollToTop />
    <AppRoutes />
  </BrowserRouter>
);
