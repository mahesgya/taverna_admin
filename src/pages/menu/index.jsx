import Sidebar from "../../components/ui/sidebar";
import Menu from "../../components/menu";
import { useState, useEffect } from "react";
import MenuForm from "../../components/menu/form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [formOn, setFormOn] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate("/");
    } else {
      setIsChecking(false);
    }
  }, [navigate]);


  const handleClick = () => {
    setFormOn(!formOn);
  };

  if (isChecking) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className=" relative flex-1 flex flex-col">
        <button onClick={handleClick} className=" absolute w-30 top-32 right-10 m-2 bg-[#0A3699] text-white p-2 rounded">
          {formOn ? "Kembali Ke Menu" : "+ Tambah Menu Baru"}
        </button>
        <main className="p-6 bg-gray-100 min-h-screen ">{formOn ? <MenuForm /> : <Menu />}</main>
      </div>
    </div>
  );
};

export default MenuPage;
