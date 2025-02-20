import { useEffect, useState } from "react";
import TestimonialService from "../../services/testimonials.services";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Review = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [testimonials, setTestimonials] = useState([]);

  const approveData = { option: true };

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const testimonials = await TestimonialService.getTestimonials();
      setTestimonials(testimonials.data);
      console.log(testimonials);
    };

    fetchData();
  }, []);

  const handleApprove = async (id) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin approve testimonial ini?",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Batal",
    });

    if (confirmed.isConfirmed) {
      await TestimonialService.approveTestimonial(approveData, id, accessToken);
      setTestimonials((prevTestimonials) => prevTestimonials.map((testimonial) => (testimonial.id === id ? { ...testimonial, option: true } : testimonial)));
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus testimonial ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (confirmed.isConfirmed) {
      await TestimonialService.deleteTestimonial(id, accessToken);
      setTestimonials((prevTestimonials) => prevTestimonials.filter((testimonial) => testimonial.id !== id));
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex items-center bg-white border shadow rounded-2xl px-4 py-2 w-1/3 focus-within:ring-2 focus-within:ring-[#0A3189]">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input type="text" placeholder="Search" className="bg-transparent outline-none w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredTestimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2 px-2 pt-4 pb-2 bg-white shadow rounded-lg">
              <div className="w-full h-full flex flex-row items-center justify-center space-x-4 bg-white rounded-lg">
                <img src={`${BASE_URL}/static/testimonial/${testimonial.filepath}`} className="w-20 h-20 shadow rounded-lg" alt={testimonial.name} />
                <div>
                  <h2 className="text-lg font-bold">{testimonial.name}</h2>
                  <p className="text-gray-500 text-sm font-semibold">{testimonial.jobTitle}</p>
                  <p className="text-gray-500 text-sm">{testimonial.description}</p>
                  <p className={`text-sm text-end ${testimonial.option ? "text-green-500" : "text-red-500"}`}>{testimonial.option ? "Telah Disetujui" : "Pending"}</p>
                </div>
              </div>
              <div className="flex w-full justify-end space-x-2">
                {!testimonial.option && (
                  <button className="text-right text-white bg-green-500 px-3 py-1 rounded-lg" onClick={() => handleApprove(testimonial.id)}>
                    Setujui
                  </button>
                )}
                <button className="text-right text-white bg-[#E02424] hover:bg-[#B91C1C] px-3 py-1 rounded-lg" onClick={() => handleDelete(testimonial.id)}>
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

export default Review;
