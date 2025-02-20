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
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
