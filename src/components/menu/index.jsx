import { useEffect, useState } from "react";
import MenuService from "../../services/menu.services";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Menu = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menus, setMenus] = useState([]);

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await MenuService.getMenus();
      setMenus(response.data);
    };
    fetchData();
  }, []);

  const handleEdit = (menu) => {
    Swal.fire({
      title: "Edit Menu",
      html: `
        <input id='swal-name' class='swal2-input' placeholder='Nama' value='${menu.name}'>
        <input id='swal-category' class='swal2-input' placeholder='Kategori' value='${menu.category}'>
        <input id='swal-description' class='swal2-input' placeholder='Deskripsi' value='${menu.description}'>
      `,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          category: document.getElementById("swal-category").value,
          description: document.getElementById("swal-description").value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await MenuService.putMenu(result.value, accessToken, menu.id);
        setMenus((prevMenus) => prevMenus.map((m) => (m.id === menu.id ? { ...m, ...result.value } : m)));
      }
    });
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus menu ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (confirmed.isConfirmed) {
      await MenuService.deleteMenu(accessToken, id);
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
    }
  };

  const filteredMenus = menus.filter((menu) => {
    return (
      (selectedCategory === "All" || menu.category === selectedCategory) &&
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="flex items-center bg-white border shadow rounded-2xl px-4 py-2 w-1/3 focus-within:ring-2 focus-within:ring-[#0A3189]">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search" 
          className="bg-transparent outline-none w-full" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="mt-4">
        <select 
          className="shadow text-gray-700 border rounded-lg px-4 py-2 focus-within:ring-2 outline-none focus-within:ring-[#0A3189]" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {[...new Set(menus.map((menu) => menu.category))].map((category, index) => (
            <option className="text-gray-700" key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Menu</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredMenus.map((menu, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2 px-2 pt-4 pb-2 bg-white shadow rounded-lg">
              <div className="w-full h-full flex flex-row items-center justify-center space-x-4 bg-white rounded-lg">
                <img 
                  src={`${BASE_URL}/static/menu/${menu.filepath}`} 
                  className="w-20 h-20 shadow rounded-lg" 
                  alt={menu.name} 
                />
                <div>
                  <h2 className="text-lg font-bold">{menu.name}</h2>
                  <p className="text-gray-600 font-semibold">{menu.category}</p>
                  <p className="text-gray-500 text-sm">{menu.description}</p>
                </div>
              </div>
              <div className="flex w-full justify-end space-x-2">
                <button 
                  className="text-white bg-[#0A3189] px-3 py-1 rounded-lg" 
                  onClick={() => handleEdit(menu)}
                >
                  Edit
                </button>
                <button 
                  className="text-white bg-[#E02424] hover:bg-[#B91C1C] px-3 py-1 rounded-lg" 
                  onClick={() => handleDelete(menu.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;