import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./scenes/HomePage.jsx";
import { BrowserRouter } from "react-router-dom";

export const statusApp = {
  update: {
    tableKhachHang: false,
  },
};

createRoot(document.getElementById("body")).render(
  // <StrictMode>
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
  // </StrictMode>,
);
