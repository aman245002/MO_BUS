import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="homepage-wrapper">
      <div className="overlay">
        <div className="content-container">
          <div className="left-content">
            <ImageCarousel />
          </div>
          <div className="right-content">
            <h2 className="text-white mb-3">Welcome to Aman Booking System</h2>
            <p className="text-white lead">
              "Aman Booking System is your reliable partner for hassle-free bus travel. Discover routes, compare prices, and book your tickets in seconds – all from one platform. Whether you're commuting daily or planning a long trip, we make your journey simple, secure, and seamless."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
