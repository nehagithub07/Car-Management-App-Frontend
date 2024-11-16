"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const router = useRouter();

  // Simulate user authentication state (e.g., from localStorage or an API call)
  useEffect(() => {
    const token = Cookies.get('token'); // Replace with your actual logic
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear auth token and update state
    Cookies.remove('token', { path: '/' });

    // Redirect to the login page or home
    router.push('/login'); // Replace with your actual logic
    setIsLoggedIn(false);

  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          🚗 CarZone
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/all-cars")}
                className="text-white font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md transition duration-300"
              >
                View All Cars
              </button>
              <button
                onClick={() => router.push("/create-car")}
                className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition duration-300 font-medium shadow-lg"
              >
                Add Car
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 bg-white font-medium hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="text-white font-medium hover:bg-white hover:text-blue-600 px-4 py-2 rounded-md transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/sign-up")}
                className="text-blue-600 bg-white font-medium hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
              >
                Signup
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-blue-500 md:hidden">
          <nav className="space-y-4 px-4 py-6">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => router.push("/view-all-cars")}
                  className="block w-full text-left text-white font-medium bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
                >
                  View All Cars
                </button>
                <button
                  onClick={() => router.push("/add-car")}
                  className="block w-full text-left text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition duration-300 font-medium shadow-lg"
                >
                  Add Car
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 bg-white hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="block w-full text-left text-white font-medium bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="block w-full text-left text-blue-600 bg-white hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
                >
                  Signup
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
