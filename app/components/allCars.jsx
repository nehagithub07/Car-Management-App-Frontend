"use client"
import { useEffect, useState } from 'react';

const Allcars = () => {
    const [cars, setCars] = useState([]);

    // Fetch car data
    useEffect(() => {
      // Mock API call to fetch cars
      const fetchCars = async () => {
        const response = await fetch('/api/cars'); // Replace with your API endpoint
        const data = await response.json();
        setCars(data);
      };
  
      fetchCars();
    }, []);
  return (
  <>
  
  <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">All Cars</h1>
      {cars.length === 0 ? (
        <p className="text-center text-gray-600">No cars available. Add some cars to see them here.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={car.images[0]} // Display the first image of the car
                alt={car.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{car.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
  )
}

export default Allcars