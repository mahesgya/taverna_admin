import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-3">
      <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2 w-1/3 focus-within:ring-2 focus-within:ring-[#0A3189]">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
