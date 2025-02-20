import { useEffect, useState } from "react";
import promoService from "../../services/promos.services";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Promo = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [promos, setPromos] = useState([]);

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const promos = await promoService.getPromos();
      setPromos(promos.data);
    };
    fetchData();
  }, []);

  const handleEdit = (promo) => {
    Swal.fire({
      title: "Edit Promo",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Judul" value="${promo.title}">
        <input id="swal-description" class="swal2-input" placeholder="Deskripsi" value="${promo.description}">
        <input id="swal-start-date" class="swal2-input" type="date" value="${new Date(promo.start_date).toISOString().split("T")[0]}">
        <input id="swal-end-date" class="swal2-input" type="date" value="${new Date(promo.end_date).toISOString().split("T")[0]}">
      `,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      preConfirm: () => {
        const startDate = document.getElementById("swal-start-date").value;
        const endDate = document.getElementById("swal-end-date").value;
  
        return {
          title: document.getElementById("swal-title").value,
          description: document.getElementById("swal-description").value,
          start_date: new Date(startDate).toISOString(),
          end_date: new Date(endDate).toISOString(),
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await promoService.putPromo(result.value, accessToken, promo.id);
        setPromos((prevPromos) =>
          prevPromos.map((p) => (p.id === promo.id ? { ...p, ...result.value } : p))
        );
      }
    });
  };
  

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Yakin ingin menghapus promo ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (confirmed.isConfirmed) {
      await promoService.deletePromo(accessToken, id);
      setPromos((prevPromos) => prevPromos.filter((promo) => promo.id !== id));
    }
  };

  const filteredPromos = promos.filter((promo) => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center bg-white border shadow rounded-2xl px-4 py-2 w-1/3 focus-within:ring-2 focus-within:ring-[#0A3189]">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input type="text" placeholder="Search" className="bg-transparent outline-none w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Promo</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredPromos.map((promo, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2 px-2 pt-4 pb-2 bg-white shadow rounded-lg">
              <div className="w-full h-full flex flex-row items-center justify-center space-x-4 bg-white rounded-lg">
                <img src={`${BASE_URL}/static/promo/${promo.filepath}`} className="w-20 h-20 shadow rounded-lg" alt={promo.title} />
                <div>
                  <h2 className="text-lg font-bold">{promo.title}</h2>
                  <p className="text-gray-500 text-sm">{promo.description}</p>
                  <p className="text-gray-500 text-[10px]">
                    {new Date(promo.start_date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} -{" "}
                    {new Date(promo.end_date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-end space-x-2">
                <button className="text-right text-white bg-[#0A3189] px-3 py-1 rounded-lg" onClick={() => handleEdit(promo)}>
                  Edit
                </button>
                <button className="text-right text-white bg-[#E02424] hover:bg-[#B91C1C] px-3 py-1 rounded-lg" onClick={() => handleDelete(promo.id)}>
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

export default Promo;
