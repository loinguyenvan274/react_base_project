import { Bang } from '../Bang.jsx';
import {ThanhTimKiem} from '../ThanhTimKiem.jsx'
import { CardItemDonHang } from '../CardItem.jsx';

export function DonHangView() {
  let khachHangs = [];
  for(let i = 0; i < 100; i++) {
    khachHangs.push( <CardItemDonHang donHang={{ 
      tenKhachHang: `Khách hàng ${i + 1}`,
      tongTien: `012345678${i}`,
      moTa: `Địa chỉ ${i + 1}`,
    }} /> );      
  }

  return (
  <>
        <h2>Danh sách đơn hàng</h2>
        <ThanhTimKiem />
        <Bang>         
          {khachHangs}
        </Bang>
  </>
      
  );
}

