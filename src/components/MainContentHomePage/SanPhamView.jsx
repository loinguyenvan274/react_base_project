import { Bang } from '../Bang.jsx';
import {ThanhTimKiem} from '../ThanhTimKiem.jsx'
import { CardItemSanPham } from '../CardItem.jsx';

export function SanPhamView() {
  let khachHangs = [];
  for(let i = 0; i < 100; i++) {
    khachHangs.push( <CardItemSanPham sanPham={{ 
      ten: `Khách hàng ${i + 1}`,
      gia: `012345678${i}`,
      donvi: `Địa chỉ ${i + 1}`,
      moTa: `khachhang${i + 1}@gmail.com` 
    }} /> );      
  }

  return (
  <>
        <h2>Danh sách sản phẩm</h2>
        <ThanhTimKiem />
        <Bang>         
          {khachHangs}
        </Bang>
  </>
      
  );
}

