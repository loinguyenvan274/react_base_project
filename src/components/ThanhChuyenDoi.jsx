import "./css/ThanhChuyenDoi.css";
import { KhachHangView } from "./MainContentHomePage/KhachHangView.jsx";
import { SanPhamView } from "./MainContentHomePage/SanPhamView.jsx";
import { DonHangView } from "./MainContentHomePage/DonHangView.jsx";
import { NoView } from "./MainContentHomePage/NoView.jsx";
import { TooltipBtn } from "./Button/BtnStyle.jsx";
import { OneStyleTooltip } from "./tooltip/styleTooltip.jsx";
import { useState } from "react";
import { FormEditInfoItem } from "./FormEditInfo.jsx";
import { Link } from "react-router-dom";

function NutThanhChuyenDoi({ text, onClick }) {
  return (
    <button className="nut-thanh-chuyen-doi" onClick={onClick}>
      {text}
    </button>
  );
}

export function ThanhChuyenDoi() {
  return (
    <div className="thanh-tuy-chon">
      <BtnAdd> </BtnAdd>

      <Link to="/">
        <NutThanhChuyenDoi text="Khách hàng" />
      </Link>

      <Link to="/san_pham">
        <NutThanhChuyenDoi text="Sản phẩm" />
      </Link>

      <Link to="/don_hang">
        <NutThanhChuyenDoi text="Đơn hàng" />
      </Link>
      <Link to="/no">
        <NutThanhChuyenDoi text="Nợ" />
      </Link>
    </div>
  );
}

function BtnAdd() {
  const [tooltipFlag, setTooltipFlag] = useState(false);

  const [currentForm, setCurrentForm] = useState("none");

  return (
    <div className="btn-add" onClick={() => setTooltipFlag((prev) => !prev)}>
      <img src="add_circle.svg" alt="Thêm mới" />
      <span>Thêm mới</span>
      {tooltipFlag && (
        <OneStyleTooltip action={setTooltipFlag}>
          <p>Thêm</p>
          <TooltipBtn
            icon={"account_avatar.svg"}
            title={"Khách hàng"}
            content={"Thêm khách hàng mới"}
            action={() => {
              setCurrentForm("KH");
            }}
          />
          <TooltipBtn
            icon={"package.svg"}
            title={"Sản phẩm"}
            content={"Thêm sản phẩm mới"}
            action={() => {
              setCurrentForm("SP");
            }}
          />
          <TooltipBtn
            icon={"invoice.svg"}
            title={"Đơn hàng"}
            content={"Tạo đơn hàng mới"}
          />
        </OneStyleTooltip>
      )}
      <FormEditInfoItem
        controlFormActive={{ currentForm, setCurrentForm }}
        editingItem={{}}
      />
    </div>
  );
}
