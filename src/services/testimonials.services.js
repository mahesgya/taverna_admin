import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_URL;

const TestimonialService = {
  getTestimonials: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/testimonial`);
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
  postTestimonial: async (data, accessToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/testimonial`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Mengirimkan Testimonial.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengirim data testimonial.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  approveTestimonial: async (data, idTestimonial, accessToken) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/testimonial/${idTestimonial}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menyetujui Testimonial.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengubah data testimonial.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
  deleteTestimonial: async (idTestimonial, accessToken) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/testimonial/${idTestimonial}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Menghapus Testimonial.",
        confirmButtonText: "Ok",
        confirmButtonColor: " #28a745",
        showCloseButton: true,
      });

      return response.data;
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal menghapus data testimonial.",
        text: error.response?.data?.errors || "Terjadi kesalahan, coba lagi.",
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#d33",
        showCloseButton: true,
      });
    }
  },
};

export default TestimonialService;
