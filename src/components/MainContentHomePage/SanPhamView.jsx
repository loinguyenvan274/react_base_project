import { Bang } from '../Bang.jsx';
import {ThanhTimKiem} from '../ThanhTimKiem.jsx'
import { CardItemSanPham } from '../CardItem.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

export function SanPhamView() {
  const [sanPhams, setSanPhams] = useState(null);
  const location = useLocation();
  const fetchData = async () => {
    const data = await window.san_pham_context.getAll();
    console.log(data);
    const sanPhams = {};
    data.map((sp) => {
      sanPhams[sp.id] = sp;
    });
    setSanPhams(sanPhams);
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const keys = Object.keys(sanPhams || {});

  return (
    <>
      <h2>Danh sách sản phẩm</h2>
      <ThanhTimKiem />
      <Bang>
        {keys.map((key) => {
          if (!sanPhams[key]) {
            delete sanPhams[key];
            return null; // Skip if sanPhams[key] is undefined
          }

          return (
            <CardItemSanPham
              key={key}
              sanPham={sanPhams[key]}
              setSanPham={(updatedSanPham) => {
                const newSanPhams = {
                  ...sanPhams,
                  [key]: updatedSanPham,
                };
                setSanPhams(newSanPhams);
              }}
            />
          );
        })}
      </Bang>
    </>
  );
}

