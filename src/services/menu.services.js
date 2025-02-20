import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_URL;

const MenuService = {
  getMenus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/menu`);
      console.log(response)
      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal memuat data.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  postMenu: async (data, accessToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/menu`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
        "content-type": "multipart/form-data"
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menambahkan Menu Baru.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengirim data menu.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  putMenu: async (data, accessToken, idMenu) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/menu/${idMenu}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Mengubah Data Menu.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengubah data menu.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  deleteMenu: async ( accessToken, idMenu) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/menu/${idMenu}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menghapus Data Menu.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.response)
      await Swal.fire({
        icon: "error",
        title: "Gagal menghapus data menu.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
};

export default MenuService;
