import { useEffect } from "react";
import AuthService from "../services/auth.services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useTokenRefresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshTokenInterval = async () => {
      const currentToken = Cookies.get("refreshToken");

      if (!currentToken) {
        navigate("/");
        return;
      }
      
      await AuthService.refreshAdmin(currentToken, navigate);
    };

    refreshTokenInterval();
    const interval = setInterval(refreshTokenInterval, 600 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default useTokenRefresh;
