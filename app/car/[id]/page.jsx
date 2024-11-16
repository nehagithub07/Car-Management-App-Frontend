"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Cookies from "js-cookie";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  const token = Cookies.get('token');
  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cars-cred.vercel.app/api/cars/get-car/${id}`,
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
          setCar(result.car);
        } else {
          setError("Failed to fetch car details");
        }
      } catch (err) {
        setError("An error occurred while fetching car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await fetch(
          `https://cars-cred.vercel.app/api/cars/delete-car/${id}`,
          {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alert("Car deleted successfully.");
          router.push("/all-cars"); // Redirect to the cars listing page
        } else {
          alert("Failed to delete the car.");
        }
      } catch (err) {
        alert("An error occurred while deleting the car.");
      }
    }
  };

  const handleEdit = () => {
    router.push(`/edit-car/${id}`); // Redirect to edit page
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading car details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!car) {
    return <p className="text-center text-gray-600">No car details found.</p>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          {car.title}
        </h1>
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Car Details Section */}
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-4">{car.title}</h2>
              <p className="text-gray-700 mb-6 text-justify leading-relaxed">
                {car.description || "Description not available"}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {car.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
              <button
  onClick={() => router.push(`/edit-car/${id}`)}
  className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
>
  Edit Car
</button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => router.back()}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>

            {/* Car Images Section */}
            <div className="p-8 bg-gray-100">
              <div className="grid grid-cols-2 gap-4">
                {car.images?.slice(0, 10).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Car Image ${index + 1}`}
                    className="w-full h-36 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
