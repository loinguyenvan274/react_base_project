// import { useState } from "react";
import { KhachHangView } from "./../components/MainContentHomePage/KhachHangView.jsx";
import { ThanhChuyenDoi } from "./../components/ThanhChuyenDoi.jsx";
import "./css/HomePage.css";
import { SanPhamView } from "../components/MainContentHomePage/SanPhamView.jsx";
import { Route, Routes } from "react-router-dom";
import { DonHangView } from "../components/MainContentHomePage/DonHangView.jsx";
import { NoView } from "../components/MainContentHomePage/NoView.jsx";
// import CpnContext from "../contextOfComponents/componentsContext.jsx";

export default function HomePage() {
  return (
    <>
      {/* <CpnContext.Provider> */}
      <ThanhChuyenDoi />
      <div className="noi-dung">
        <Routes>
          <Route path="/" element={<KhachHangView />} />
          <Route path="/san_pham" element={<SanPhamView />} />
          <Route path="/don_hang" element={<DonHangView />} />
          <Route path="/no" element={<NoView />} />
        </Routes>
      </div>
      {/* </CpnContext.Provider> */}
    </>
  );
}
