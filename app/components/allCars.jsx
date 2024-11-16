"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Allcars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced search value
  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = Cookies.get('token');

  const router = useRouter();

  useEffect(() => {
    // Debouncing logic
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer); // Cleanup on component unmount or input change
  }, [searchTerm]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `https://cars-cred.vercel.app/api/cars/get-cars?keyword=${debouncedSearch}`, // Add keyword to API params
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Cars fetched:", result);
          setCars(result.cars); // Update the state with fetched cars
        } else {
          console.error("Failed to fetch cars. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    if (token) {
      fetchCars(); // Fetch cars whenever debouncedSearch or token changes
    }
  }, [debouncedSearch, token]);

  const handleClick = (id) => {
    router.push(`/car/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">All Cars</h1>

      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search cars by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {cars.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No cars available. Try searching with a different keyword.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300"
            >
              <img
                onClick={() => handleClick(car._id)}
                src={car.images?.[0] || "https://via.placeholder.com/400x300"} // Safely access the first image or use a placeholder
                alt={car.title || "Car Image"}
                className="h-56 w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 truncate">{car.title || "No Title"}</h2>
                <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                  {car.description || "No Description Available"}
                </p>
                <button
                  onClick={() => handleClick(car._id)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allcars;
