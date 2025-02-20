import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import ikon mata
import AuthService from "../../services/auth.services";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthService.loginAdmin(email, password, navigate);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-3/5 bg-gray-100 m-4 rounded-3xl"></div>

      <div className="w-2/5 flex items-center justify-center p-10">
        <div className="w-full max-w-sm">
          <h2 className="font-lexend text-4xl font-bold mb-6 text-gray-900 flex items-center">
            Welcome 👋
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-lexend text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="font-lexend w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[#0A3189]"
              />
            </div>
            
            <div className="mb-4 relative">
              <label htmlFor="password" className="font-lexend block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="font-lexend w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[#0A3189] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-12 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 text-[##0A3189]"
              />
              <label htmlFor="remember" className="font-lexend text-gray-600">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="font-lexend w-full p-3 bg-[#0A3189] text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
