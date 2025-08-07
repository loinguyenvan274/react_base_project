import { Bang } from '../Bang.jsx';
import {ThanhTimKiem} from '../ThanhTimKiem.jsx'
import { CardItemKhachHang } from '../CardItem.jsx';

export function KhachHangView() {
  let khachHangs = [];
  for(let i = 0; i < 100; i++) {
    khachHangs.push( <CardItemKhachHang khachHang={{ 
      ten: `Khách hàng ${i + 1}`,
      soDienThoai: `012345678${i}`,
      diaChi: `Địa chỉ ${i + 1}`,
      gmail: `khachhang${i + 1}@gmail.com`
    }} /> );      
  }

  return (
  <>
        <h2>Danh sách khách hàng</h2>
        <ThanhTimKiem />
        <Bang>         
          {khachHangs}
        </Bang>
  </>
      
  );
}


