import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import SingleVenue from "./singlevenue/SingleVenue";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/singlevenue/:id" element={<SingleVenue />} />
    </Routes>
  );
}
