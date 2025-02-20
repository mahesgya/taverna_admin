import { useState } from "react";
import PromoService from "../../services/promos.services";
import Cookies from "js-cookie";

const PromoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    start_date: "",
    end_date: "",
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
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("start_date", new Date(formData.start_date).toISOString());
    formDataToSend.append("end_date", new Date(formData.end_date).toISOString());

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    await PromoService.postPromo(formDataToSend, accessToken);
    setFormData({ title: "", description: "", image: null, start_date: "", end_date: "" });

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-start">Detail Promo</h2>
      <h4 className="text-xl font-normal mb-4 text-start">Promo > Tambah Promo Baru</h4>
      <div className="p-6 bg-white shadow rounded-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Tambahkan Promo Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4 w-[100%]">
            <div className="w-full space-y-2">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Nama Promo</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="outline-none focus:ring-2 focus:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Deskripsi Promo</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} className="outline-none focus:ring-2 focus:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Tanggal Mulai</label>
                <input required type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="outline-none focus:ring-2 focus:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Tanggal Berakhir</label>
                <input required type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="outline-none focus:ring-2 focus:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Foto Promo</label>
                <input required type="file" accept="image/*" onChange={handleImageChange} className="outline-none focus:ring-2 focus:ring-[#0A3189] w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          <button type="submit" className={`w-full p-2 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-[#0A3189]"}`} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Promo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromoForm;
