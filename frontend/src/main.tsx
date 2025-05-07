import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Layout from "./Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/home/Home.tsx";
import Login from "./routes/Login.tsx";
import About from "./routes/About.tsx";
import Packages from "./routes/package/Packages.tsx";
import SignUp from "./routes/SignUp.tsx";
import Booking from "./routes/booking/Booking.tsx";
import Profile from "./routes/profile/Profile.tsx";
import ProfileLayout from "./routes/profile/ProfileLayout.tsx";
import History from "./routes/profile/History.tsx";
import MyBooking from "./routes/profile/MyBooking.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";
import AuthProvider from "./components/common/AuthProvider.tsx";
import ProtectRoute from "./components/common/ProtectRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="j_travel-react">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="packages" element={<Packages />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<ProtectRoute />}>
              <Route path="booking" element={<Booking />} />
              <Route path="account" element={<ProfileLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="history" element={<History />} />
                <Route path="book" element={<MyBooking />} />
              </Route>
            </Route>
          </Route>
          <Route path="admin" element={<AdminPanel />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
