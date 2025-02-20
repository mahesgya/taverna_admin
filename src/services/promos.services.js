import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_URL;

const PromoService = {
  getPromos: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/promo`);
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
  postPromo: async (data, accessToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/promo`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
        "content-type": "multipart/form-data",
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menambah Data Promo.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengirim data promo.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  putPromo: async (data, accessToken, idPromo) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/promo/${idPromo}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Mengubah Data Promo.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengubah data promo.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  deletePromo: async (accessToken, idPromo) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/promo/${idPromo}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menghapus Data Promo.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal menghapus data promo.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
};

export default PromoService;
