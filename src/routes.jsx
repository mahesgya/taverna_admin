import LoginAdmin from "./pages/login";
import MainPage from "./pages/main";
import MenuPage from "./pages/menu";
import PromoPage from "./pages/promo";
import TestimonialPage from "./pages/testimonial";

const Routess = [
  {
    path: "/",
    element: <LoginAdmin />,
  },
  {
    path: "/dashboard",
    element: <MainPage />,
  },
  {
    path: "/dashboard/menu",
    element: <MenuPage />,
  },
  {
    path: "/dashboard/review",
    element: <TestimonialPage/>,
  },
  {
    path: "/dashboard/promo",
    element: <PromoPage/>,
  },
];

export default Routess;
