import { useState, useEffect } from "react";
import MenuService from "../../services/menu.services";
import TestimonialService from "../../services/testimonials.services";
import PromoService from "../../services/promos.services";

const Home = () => {
  const [totalMenus, setTotalMenus] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPromos, setTotalPromos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        const menus = await MenuService.getMenus();
        setTotalMenus(menus.data.length);

        const reviews = await TestimonialService.getTestimonials();
        setTotalReviews(reviews.data.length);

        const promos = await PromoService.getPromos();
        setTotalPromos(promos.data.length);

    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-gray-600">Total Menu</p>
          <h2 className="text-xl font-bold">{totalMenus}</h2>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-gray-600">Total Reviews</p>
          <h2 className="text-xl font-bold">{totalReviews}</h2>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <p className="text-gray-600">Total Promo</p>
          <h2 className="text-xl font-bold">{totalPromos}</h2>
        </div>
      </div>

    </div>
  );
};

export default Home;
