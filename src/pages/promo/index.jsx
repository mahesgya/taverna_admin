import Sidebar from "../../components/ui/sidebar";
import Promo from "../../components/promo";
import PromoForm from "../../components/promo/form";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const PromoPage = () => {
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
      <div className="relative flex-1 flex flex-col">
        <button onClick={handleClick} className=" absolute w-30 top-32 right-10 m-2 bg-[#0A3699] text-white p-2 rounded">
          {formOn ? "Kembali Ke Promo" : "+ Tambah Promo Baru"}
        </button>
        <main className="p-6 bg-gray-100 min-h-screen ">{formOn ? <PromoForm /> : <Promo />}</main>
      </div>
    </div>
  );
};

export default PromoPage;
