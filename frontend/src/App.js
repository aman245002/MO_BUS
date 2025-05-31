import ManageProfiles from "./pages/admin/ManageProfiles";
import ManageBuses from "./pages/ManageBuses";
import ManageBusStops from "./pages/ManageBusStops";
import UserProfile from "./pages/UserProfile";
import TotalBuses from "./pages/TotalBuses";
import BusStops from "./pages/BusStops";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BusSearch from "./pages/BusSearch";
import Booking from "./pages/Booking";
import UserDashboard from "./components/UserDashboard";
import AddBus from "./components/AddBus";
import EditBus from "./components/EditBus";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with AppNavbar and Footer */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />

        {/* Routes without AppNavbar/Footer (they have their own) */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/search" element={<BusSearch />} />
        <Route path="/book/:busId" element={<Booking />} />
        <Route path="/total-busstops" element={<BusStops />} />
        <Route path="/total-buses" element={<TotalBuses />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/manage-busstops" element={<ManageBusStops />} />
        <Route path="/manage-buses" element={<ManageBuses />} />
        <Route path="/admin/add-bus" element={<AddBus />} />
        <Route path="/admin/manage-profiles" element={<ManageProfiles />} />
        <Route path="/admin/edit-bus/:id" element={<EditBus />} />

      </Routes>
    </Router>
  );
}

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-fill">{children}</main>
      <Footer />
    </div>
  );
}

export default App;
