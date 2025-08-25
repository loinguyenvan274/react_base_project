import { useEffect, useState } from "react";
import { Bang } from "../Bang.jsx";
import { ThanhTimKiem } from "../ThanhTimKiem.jsx";
import { CardItemKhachHang } from "../CardItem.jsx";
import { useLocation } from "react-router-dom";

export function KhachHangView() {
  const [khachHangs, setKhachHangs] = useState(null);
  const location = useLocation();
  const fetchData = async () => {
    const data = await window.khach_hang_context.getAll();
    console.log(data);
    const khachHangs = {};
    data.map((kh) => {
      khachHangs[kh.id] = kh;
    });
    setKhachHangs(khachHangs);
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const keys = Object.keys(khachHangs || {});

  return (
    <>
      <h2>Danh sách khách hàng</h2>
      <ThanhTimKiem />
      <Bang>
        {keys.map((key) => {
          if (!khachHangs[key]) {
            delete khachHangs[key];
            return null; // Skip if khachHangs[key] is undefined
          }

          return (
            <CardItemKhachHang
              key={key}
              khachHang={khachHangs[key]}
              setKhachHang={(updatedKhachHang) => {
                const newKhachHangs = {
                  ...khachHangs,
                  [key]: updatedKhachHang,
                };
                setKhachHangs(newKhachHangs);
              }}
            />
          );
        })}
      </Bang>
    </>
  );
}
