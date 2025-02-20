import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaHome, FaStar, FaTags, FaSignOutAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import AuthService from "../../services/auth.services";
import Cookies from "js-cookie";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("");
  const refreshToken = Cookies.get("refreshToken");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const menuItems = [
    { name: "Main", path: "/dashboard", icon: <FaHome /> },
    { name: "Menu", path: "/dashboard/menu", icon: <MdRestaurantMenu /> },
    { name: "Review", path: "/dashboard/review", icon: <FaStar /> },
    { name: "Promo", path: "/dashboard/promo", icon: <FaTags /> },
  ];

  const handleLogout = async () => {
    await AuthService.logoutAdmin(refreshToken, navigate);
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h2 className="text-xl font-bold text-gray-800">Admin Taverna</h2>
      </div>

      <nav className="flex flex-col gap-3 pt-4">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-lg ${activePath === item.path ? "bg-[#0A3189] text-white" : "text-gray-700 hover:bg-gray-200"}`}>
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 px-4 py-2 hover:bg-red-100 rounded-lg">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
