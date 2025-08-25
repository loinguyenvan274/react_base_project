import {  useState } from "react";
import { IconBtn, TooltipBtn } from "./Button/BtnStyle";
import "./css/CardItem.css";
import { OneStyleTooltip } from "./tooltip/styleTooltip";
import { FormEditInfoItem } from "./FormEditInfo";

export function CardItemKhachHang(props) {
  const [tooltipFlag, setTooltipFlag] = useState(false);
  const { khachHang, setKhachHang } = props;

  const [currentForm, setCurrentForm] = useState("none");

  return (
    <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="account_avatar.svg" alt="Hình ảnh khách hàng" />
      </div>
      <div className="thong-tin-card">
        <span className="ten-std">
          {khachHang.ten} <span>{khachHang.so_dien_thoai}</span>
        </span>
        <span className="dia-chi-gmail">
          Địa chỉ: {khachHang.dia_chi} <span> Gmail: {khachHang.gmail}</span>
        </span>
      </div>
      <div className="thanh-nut">
        <IconBtn
          btnIcon={khachHang.yeu_thich ? "bookmark_fill.svg" : "bookmark.svg"}
          action={async () => {
            khachHang.yeu_thich = khachHang.yeu_thich == 0 ? 1 : 0;
            await window.khach_hang_context.update(khachHang);
            setKhachHang(khachHang);
          }}
        ></IconBtn>

        <IconBtn
          btnIcon={"more_icon.svg"}
          action={() => {
            setTooltipFlag((prev) => {
              return !prev;
            });
          }}
        >
          {tooltipFlag && (
            <OneStyleTooltip action={setTooltipFlag}>
              <TooltipBtn
                title={"Xóa"}
                content={"Xóa các thông của khách hàng này"}
                icon={"delete.svg"}
                action={async () => {
                  await window.khach_hang_context.delete(khachHang.id);
                  setKhachHang(null);
                }}
              />
              <TooltipBtn
                icon={"package.svg"}
                title={"Chỉnh sửa"}
                content={"Thay đổi thông tin khách hàng"}
                action={() => {
                  setCurrentForm("KH");
                }}
              />
            </OneStyleTooltip>
          )}
        </IconBtn>
      </div>
      <FormEditInfoItem
        controlFormActive={{ currentForm, setCurrentForm }}
        editingItem={khachHang}
      />
    </div>
  );
}

export function CardItemNo({ khachHang }) {
  return (
    <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="money_off.svg" alt="Hình ảnh khách hàng" />
      </div>
      <div className="thong-tin-card">
        <span className="ten-std">
          {khachHang.ten} <span>{khachHang.soDienThoai}</span>
        </span>
        <span className="dia-chi-gmail">
          Địa chỉ: {khachHang.diaChi} <span> Gmail: {khachHang.gmail}</span>
        </span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <IconBtn
          btnIcon={"more_icon.svg"}
          action={() => {
            // setTooltipFlag((prev) => {
            //   return !prev;
            // });
          }}
        >
          {/* {tooltipFlag && (
            <OneStyleTooltip action={setTooltipFlag}>
              <TooltipBtn
                title={"Xóa"}
                content={"Xóa các thông của khách hàng này"}
                icon={"delete.svg"}
                action={async () => {
                  await window.khach_hang_context.delete(khachHang.id);
                  setKhachHang(null);
                }}
              />
              <TooltipBtn
                icon={"package.svg"}
                title={"Chỉnh sửa"}
                content={"Thay đổi thông tin khách hàng"}
                action={() => {
                  setCurrentForm("KH");
                }}
              />
            </OneStyleTooltip>
          )} */}
        </IconBtn>
      </div>
    </div>
  );
}

export function CardItemSanPham({ sanPham }) {
  return (
    <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="package.svg" alt="Hình ảnh sản phẩm" />
      </div>
      <div className="thong-tin-card">
        <span className="ten-san-pham">{sanPham.ten}</span>
        <span className="gia-san-pham">
          {sanPham.gia} Đ /{sanPham.donvi}{" "}
        </span>
        <span className="mo-ta-san-pham">Mô tả: {sanPham.moTa}</span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <IconBtn
          btnIcon={"more_icon.svg"}
          action={() => {
            // setTooltipFlag((prev) => {
            //   return !prev;
            // });
          }}
        >
          {/* {tooltipFlag && (
            <OneStyleTooltip action={setTooltipFlag}>
              <TooltipBtn
                title={"Xóa"}
                content={"Xóa các thông của khách hàng này"}
                icon={"delete.svg"}
                action={async () => {
                  await window.khach_hang_context.delete(khachHang.id);
                  setKhachHang(null);
                }}
              />
              <TooltipBtn
                icon={"package.svg"}
                title={"Chỉnh sửa"}
                content={"Thay đổi thông tin khách hàng"}
                action={() => {
                  setCurrentForm("KH");
                }}
              />
            </OneStyleTooltip>
          )} */}
        </IconBtn>
      </div>
    </div>
  );
}
export function CardItemDonHang({ donHang }) {
  return (
    <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="invoice.svg" alt="Hình ảnh sản phẩm" />
      </div>
      <div className="thong-tin-card">
        <span className="ten-san-pham">{donHang.tenKhachHang}</span>
        <span className="gia-san-pham">{donHang.tongTien} </span>
        <span className="mo-ta-san-pham">Mô tả: {donHang.moTa}</span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <button className="nut-xoa">Tùy</button>
      </div>
    </div>
  );
}
