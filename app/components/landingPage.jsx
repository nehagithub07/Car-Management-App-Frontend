"use client";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Rent Your Dream Car</h1>
          <p className="text-lg md:text-xl mb-8">
            Affordable, Reliable, and Convenient Car Rentals Anytime, Anywhere.
          </p>
          <button
            onClick={() => router.push("/view-all-cars")}
            className="bg-white text-blue-600 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            View All Cars
          </button>
        </div>
      </section>

      {/* Car Categories */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category Cards */}
          {[
            { name: "Luxury Cars", image: "/audi1.jpeg" },
            { name: "SUVs", image: "/audi2.jpeg" },
            { name: "Economy Cars", image: "/audi3.jpeg" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <button
                  onClick={() => router.push(`/category/${category.name.toLowerCase()}`)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefits */}
            {[
              {
                title: "Wide Selection",
                description: "Choose from a variety of cars to suit your needs.",
                icon: "🚗",
              },
              {
                title: "Affordable Prices",
                description: "Get the best rates without compromising on quality.",
                icon: "💰",
              },
              {
                title: "24/7 Support",
                description: "Our team is always ready to assist you anytime.",
                icon: "📞",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

     
    
    </div>
  );
};

export default LandingPage;
