import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import AnimatedBackground from "./components/AnimatedBackground";
import Footer from "./components/footer";
import App from "./app.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <App />
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
