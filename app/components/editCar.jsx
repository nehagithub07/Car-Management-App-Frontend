"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const EditCar = () => {
  const [car, setCar] = useState({
    title: "",
    description: "",
    images: [], // Holds URLs of images
    tags: [], 
  });
  const [newImage, setNewImage] = useState(null); // File to upload
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // Image upload loading state
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = useParams();
  const token = Cookies.get('token');
  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `https://cars-cred.vercel.app/api/cars/get-car/${id}`,
          {
            method: "GET",
          
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setCar(result.car); // Populate form fields
        } else {
          setError("Failed to fetch car details.");
        }
      } catch (err) {
        setError("An error occurred while fetching car details.");
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async () => {
    if (!newImage) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("images", newImage);

      const response = await fetch("https://cars-cred.vercel.app/api/cars/upload-images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setCar((prev) => ({ ...prev, images: [...prev.images, result.images[0]] }));
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      alert("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
      setNewImage(null);
    }
  };

  const handleDeleteImage = (imageUrl) => {
    // Remove the image from the array
    setCar((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageUrl),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://cars-cred.vercel.app/api/cars/update-car/${id}`,
        {
          method: "PUT",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
          body: JSON.stringify(car),
        }
      );

      if (response.ok) {
        alert("Car updated successfully!");
        router.push(`/car/${id}`); // Redirect to car details page
      } else {
        alert("Failed to update car.");
      }
    } catch (err) {
      alert("An error occurred while updating the car.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Edit Car</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={car.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={car.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block font-semibold text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={car.tags.join(", ")}
            onChange={(e) =>
              setCar((prev) => ({ ...prev, tags: e.target.value.split(",").map((tag) => tag.trim()) }))
            }
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block font-semibold text-gray-700">
            Current Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {car.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Car Image ${index + 1}`}
                  className="w-full h-32 object-cover border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="newImage" className="block font-semibold text-gray-700">
            Upload New Image
          </label>
          <input
            type="file"
            id="newImage"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full p-3 border rounded-md"
          />
          {newImage && (
            <button
              type="button"
              onClick={handleImageUpload}
              className={`mt-2 px-6 py-2 rounded-md text-white ${uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} transition-colors`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} transition-colors`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
