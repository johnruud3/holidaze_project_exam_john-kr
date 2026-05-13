import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import SingleVenue from "./singlevenue/SingleVenue";
import Register from "./register/Register";
import Login from "./login/Login";
import Profile from "./profile/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/singlevenue/:id" element={<SingleVenue />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
