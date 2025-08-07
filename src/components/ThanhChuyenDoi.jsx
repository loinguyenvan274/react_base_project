
import './css/ThanhChuyenDoi.css';
import { KhachHangView } from './MainContentHomePage/KhachHangView.jsx';
import { SanPhamView } from './MainContentHomePage/SanPhamView.jsx';  
import { DonHangView } from './MainContentHomePage/DonHangView.jsx';
import { NoView } from './MainContentHomePage/NoView.jsx';

function NutThanhChuyenDoi({ text, onClick }) {
  return (
    <button className="nut-thanh-chuyen-doi" onClick={onClick}>
      {text}
    </button>
  );
}
export function ThanhChuyenDoi({ setMainContent }) {
  return (
    <nav className="thanh-tuy-chon">
      <NutThanhChuyenDoi text="Khách hàng" onClick={() => setMainContent(<KhachHangView />)} />
      <NutThanhChuyenDoi text="Sản phẩm" onClick={() => setMainContent(<SanPhamView />)} />
      <NutThanhChuyenDoi text="Đơn hàng" onClick={() => setMainContent(<DonHangView />)} />
      <NutThanhChuyenDoi text="Nợ" onClick={() => setMainContent(<NoView />)} />
    </nav>
  );
}

