import { useEffect, useRef } from "react";
import "./css/InputForm.css";
import { InputBoxHasTitle, SelectBox } from "./Input/InputBox";
import { useState } from "react";
import { CuaSoNoi } from "./CuaSoNoi.jsx";
import { Style_1_Title } from "./Title/StyleTitle.jsx";
import { Style1CancelConfirmBox } from "./Box/CancelComfirmBox.jsx";
import { useNavigate } from "react-router-dom";

function InputFormKhachHang({ setKhachHang, initKhachHang = {} }) {
  const khachHang = useRef(initKhachHang);
  const setKhachHangInfo = (thuocTinh, dataChen) => {
    khachHang.current[thuocTinh] = dataChen;
    setKhachHang(khachHang.current);
  };
  useEffect(() => {
    setKhachHang(initKhachHang);
  }, []);

  return (
    <div className="InputFormKhachHang_box">
      <InputBoxHasTitle
        title={"Họ và tên"}
        inputType={"text"}
        moTa={"Nhập đầy đủ họ và tên"}
        inputName={"ten"}
        insertData={setKhachHangInfo}
        initInput={khachHang.current.ten}
      />
      <SelectBox title={"Giới tính"}>
        <option>Chưa rõ</option>
        <option>Nam</option>
        <option>Nữ</option>
      </SelectBox>

      <InputBoxHasTitle
        title={"Số điện thoại"}
        inputType={"tel"}
        moTa={"Nhập đầy đủ họ và tên"}
        inputName={"so_dien_thoai"}
        insertData={setKhachHangInfo}
        initInput={khachHang.current.so_dien_thoai}
      />
      <InputBoxHasTitle
        title={"Căn cước công dân"}
        inputType={"text"}
        moTa={""}
        inputName={"can_cuoc_cong_dan"}
        insertData={setKhachHangInfo}
        initInput={khachHang.current.can_cuoc_cong_dan}
      />
      <InputBoxHasTitle
        title={"Địa chỉ"}
        inputType={"text"}
        moTa={""}
        inputName={"dia_chi"}
        insertData={setKhachHangInfo}
        initInput={khachHang.current.dia_chi}
      />
      <InputBoxHasTitle
        title={"Gmail"}
        inputType={"text"}
        moTa={"Nhập đầy đủ họ và tên"}
        inputName={"gmail"}
        insertData={setKhachHangInfo}
        initInput={khachHang.current.gmail}
      />
      <InputBoxHasTitle
        title={"Ngày sinh"}
        inputType={"date"}
        moTa={""}
        inputName={"sinh_ngay"}
        insertData={setKhachHangInfo}
        initInput={khachHang.current.sinh_ngay}
      />
    </div>
  );
}
function InputFormSanPham({ setSanPham, initSanPham = {} }) {
  const sanPham = useRef(initSanPham);

  const setSanPhamInfo = (thuocTinh, dataChen) => {
    sanPham.current[thuocTinh] = dataChen;
    setSanPham(sanPham.current);
  };

  useEffect(() => {
    setSanPham(initSanPham);
  }, []);

  return (
    <div className="InputFormSanPham_box">
      <InputBoxHasTitle
        title={"Tên sản phẩm"}
        inputType={"text"}
        moTa={"Nhập tên sản phẩm"}
        inputName={"ten"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.ten}
      />

      <InputBoxHasTitle
        title={"Đơn vị tính"}
        inputType={"text"}
        moTa={"Ví dụ: cái, kg, thùng..."}
        inputName={"don_vi_tinh"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.don_vi_tinh}
      />

      <InputBoxHasTitle
        title={"Giá gốc"}
        inputType={"number"}
        moTa={"Nhập giá gốc (VNĐ)"}
        inputName={"gia_goc"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.gia_goc}
      />

      <InputBoxHasTitle
        title={"Số lượng trong kho"}
        inputType={"number"}
        moTa={"Nhập số lượng hiện có"}
        inputName={"so_luong_o_kho"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.so_luong_o_kho}
      />

      <InputBoxHasTitle
        title={"Mô tả sản phẩm"}
        inputType={"text"}
        moTa={"Thông tin chi tiết sản phẩm"}
        inputName={"mo_ta"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.mo_ta}
      />

      <InputBoxHasTitle
        title={"Link hình ảnh"}
        inputType={"text"}
        moTa={"Dán link ảnh minh họa"}
        inputName={"link_hinh_anh"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.link_hinh_anh}
      />

      <InputBoxHasTitle
        title={"Danh mục sản phẩm"}
        inputType={"number"}
        moTa={"ID danh mục (tham chiếu bảng danh_muc_sp)"}
        inputName={"id_danh_muc"}
        insertData={setSanPhamInfo}
        initInput={sanPham.current.id_danh_muc}
      />
    </div>
  );
}

export function FormEditInfoItem(props) {
  const changeRoute = useNavigate();
  // props.changeRoute = changeRoute;
  const { controlFormActive, editingItem } = props;
  const setActive = (isOn) => {
    if (!isOn) controlFormActive.setCurrentForm("none");
  };

  const [khachHangEding, setkhachHangEding] = useState({});
  const [sanPham, setSanPham] = useState({});
  console.log(sanPham);
  if (controlFormActive.currentForm == "none") return <></>;

  let title = "Chỉnh sửa thông tin";
  let inputForm = <></>;
  let onConfirm = () => {};
  if (editingItem.id == null) {
    title = "Thêm thông tin";
  }
  //tao form phu hop voi yeu cau
  if (controlFormActive.currentForm == "KH") {
    inputForm = (
      <InputFormKhachHang
        setKhachHang={setkhachHangEding}
        initKhachHang={editingItem}
      />
    );
    onConfirm = async () => {
      if (khachHangEding.id != null) {
        await window.khach_hang_context.update(khachHangEding);
      } else {
        await window.khach_hang_context.add(khachHangEding);
      }
      changeRoute("/");
      setActive(false);
    };
  } else if (controlFormActive.currentForm == "SP") {
    inputForm = (
      <InputFormSanPham
        setSanPham={setSanPham}
        initSanPham={editingItem}
      />
    );
    onConfirm = async () => {
      if (sanPham.id != null) {
        await window.san_pham_context.update(sanPham);
      } else {
        await window.san_pham_context.add(sanPham);
      }
      changeRoute("/san_pham");
      setActive(false); 
    };
  }
  return (
    <CuaSoNoi onEditBox={setActive}>
      <Style_1_Title>{title}</Style_1_Title>
      {inputForm}
      <Style1CancelConfirmBox
        onConfirm={onConfirm}
        batCuaSo={setActive}
      ></Style1CancelConfirmBox>
    </CuaSoNoi>
  );
}
