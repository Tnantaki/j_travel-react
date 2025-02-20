import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Layout from "./Layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/home/Home.tsx";
import Login from "./routes/Login.tsx";
import About from "./routes/About.tsx";
import Packages from "./routes/packages/Packages.tsx";
import SignUp from "./routes/SignUp.tsx";
import Booking from "./routes/booking/Booking.tsx";
import Profile from "./routes/profile/Profile.tsx";
import ProfileLayout from "./routes/profile/ProfileLayout.tsx";
import History from "./routes/profile/History.tsx";
import MyBooking from "./routes/profile/MyBooking.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="j_travel-react/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="packages" element={<Packages />} />
          <Route path="booking" element={<Booking />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="book" element={<MyBooking />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
