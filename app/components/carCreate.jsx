"use client";
import { useState } from "react";

const Carcreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    images: [],
  });
  const [images,setImages] = useState(['']);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const token = localStorage.getItem('token')
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("images", file);
    try {
      // Replace with your upload API endpoint
      const response = await fetch(`https://cars-cred.vercel.app/api/cars/upload-images`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        return data?.images[0]; // Assuming the response contains a `url` key with the image URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert tags string to an array
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const imageUrls = [];
    for (let file of images) {
      const url = await uploadImage(file); // Upload each image
      if (url) {
        imageUrls.push(url); // Push the URL if upload is successful
      }
    }
  
    const submittedData = {
      ...formData,
      tags: tagsArray,
      images: imageUrls, // Array of uploaded image URLs
    };
  
    console.log("Form Data Submitted:", submittedData); // Check the final data
  
    // Send to your backend API (replace with actual API endpoint)
    try {
      const response = await fetch(`https://cars-cred.vercel.app/api/cars/add-car`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedData),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 px-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add a New Car
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Enter the car title"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Provide a brief description"
                rows="4"
                required
              />
            </div>

            {/* Tags Field */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="e.g., sedan, hybrid, luxury"
              />
            </div>

            {/* Images Field */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Upload Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
              {formData.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-md p-2 text-xs text-gray-700"
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-900 transition duration-300"
            >
              Add Car
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Carcreate;
