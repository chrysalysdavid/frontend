import "./App.scss";
import "./Components/Styles/Styles.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Artist from "./Components/Artist/Artist";
import Art_insomnious from "./Components/Art_Insomnius/Art_insomnious";
import AboveBelow from "./Components/AboveBelow/AboveBelow";
import Login from "./Components/Login/Login";
import ArtistPage from "./Components/ArtistPage/ArtistPage";
import Abstract from "./Components/Abstract/Abstract";
import ExclusiveWork from "./Components/Exclusive_work/Exclusive_work";
import OpenEdition from "./Components/Open_Edition/open_edition";
import FormaMember from "./Components/forma_member/formamember";
import ArtistPortal from "./Components/ArtistPortal/ArtistPortal";
import Footer from "./Components/Footer/Footer";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import ManageArtwork from "./Components/ArtistDashboard/ManageArtwork/ManageArtwork";
import Report from "./Components/ArtistDashboard/Report/Report";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import Cartpage from "./Components/Cartpage/Cartpage";
import Checkout from "./Components/CheckoutPage/Checkout";
import AddArt from "./Components/AddArt/AddArt";
import Sales from "./Components/ArtistDashboard/Sales/Sales";
import Accounts from "./Components/ArtistDashboard/Account/Account";
import CustomerDash from "./Components/CustomerDasboard/CustomerDash";
import ProtectedRoute from "./Services/ProtectedRoute";
import Register from "./Components/Register/Register";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51QP6OwKFHuWNNAwBoA2LOUUZzAeex6Uy0mo0tkN8lHmi0tzJSt2IiceHolR9HAjWwgGpr1yQlFDIKBC17Ke0dtv2003iZxxwUK");

// Functional component for handling location-based conditional rendering
function App() {
  return (
    <Router>
      <AppWithNavbar />
    </Router>
  );
}

function AppWithNavbar() {
  const location = useLocation(); // Now inside Router, useLocation will work

  // Determine if the current route is under ArtistDashboard (no Navbar should appear)
  const isDashboardRoute = location.pathname.startsWith("/ArtistDashboard");

  return (
    <>
      {/* Conditionally render Navbar based on the route */}
      {!isDashboardRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/art-of-Insomnius" element={<Art_insomnious />} />
        <Route path="/categories/:categoryID" element={<AboveBelow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/ArtistPage" element={<ArtistPage />} />
        <Route path="/Abstract" element={<Abstract />} />
        <Route path="/Exclusive-Works" element={<ExclusiveWork />} />
        <Route path="/open-edition" element={<OpenEdition />} />
        <Route path="/forma-member" element={<FormaMember />} />
        <Route path="/artistportal" element={<ArtistPortal />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route
          path="/CustomerDashboard"
          element={
            <ProtectedRoute>
              <CustomerDash />
            </ProtectedRoute>
          }
        />
        {/* Routes with no Navbar */}
        <Route
          path="/ArtistDashboard/ManageArtwork"
          element={<ManageArtwork />}
        />
        <Route path="/ArtistDashboard/Sales" element={<Sales />} />
        <Route path="/ArtistDashboard/Profile" element={<Accounts />} />
        <Route path="/ArtistDashboard/Report" element={<Report />} />
        <Route path="/addArt" element={<AddArt />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Cartpage" element={<Cartpage />} />
        <Route path="/Checkout" element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        } />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
