import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./landingpage/LandingPage";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <LandingPage />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
