import Sidebar from "../../components/ui/sidebar";
import Testimonials from "../../components/testimonial";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TestimonialPage = () => {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    navigate("/");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex-1 flex flex-col">
        <main className="p-6 bg-gray-100 min-h-screen ">
          <Testimonials />
        </main>
      </div>
    </div>
  );
};

export default TestimonialPage;
