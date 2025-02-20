import { useState } from "react";
import menuServices from "../../services/menu.services";
import Cookies from "js-cookie"
const MenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    await menuServices.postMenu(formDataToSend, accessToken);
    setFormData({ name: "", description: "", category: "", image: null });

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-start">Detail Menu</h2>
      <h4 className="text-xl font-normal mb-4 text-start">Menu > Tambah Menu Baru</h4>
      <div className="p-6 bg-white shadow rounded-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Tambahkan Menu Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Nama Menu</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="outline-none focus-within:ring-2 outline-none focus-within:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Kategori Menu</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} className="outline-none focus-within:ring-2 outline-none focus-within:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Deskripsi Menu</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} className="outline-none focus-within:ring-2 outline-none focus-within:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Foto Menu</label>
            <input required type="file" accept="image/*" onChange={handleImageChange} className="outline-none focus-within:ring-2 outline-none focus-within:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
          </div>

          <button type="submit" className={`w-full p-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-[#0A3189]  "}`} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Menu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
