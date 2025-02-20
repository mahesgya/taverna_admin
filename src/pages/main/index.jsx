import Sidebar from "../../components/ui/sidebar";
import Home from "../../components/home";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate("/");
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  if (isChecking) {
    return null; 
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-6 bg-gray-100 min-h-screen">
          <Home />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
