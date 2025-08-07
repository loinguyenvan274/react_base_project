import './css/CardItem.css';

export function CardItemKhachHang({khachHang}){
   return (
    <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="account_avatar.svg" alt="Hình ảnh khách hàng" />
      </div>
      <div className="thong-tin-card">
        <span className='ten-std'>{khachHang.ten} <span >{khachHang.soDienThoai}</span></span>
        <span className='dia-chi-gmail'>Địa chỉ: {khachHang.diaChi}  <span> Gmail: {khachHang.gmail}</span></span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <button className="nut-xoa">Tùy</button>
      </div>     
    </div>
  );
}
export function CardItemNo({khachHang}){
   return (
    <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="money_off.svg" alt="Hình ảnh khách hàng" />
      </div>
      <div className="thong-tin-card">
        <span className='ten-std'>{khachHang.ten} <span >{khachHang.soDienThoai}</span></span>
        <span className='dia-chi-gmail'>Địa chỉ: {khachHang.diaChi}  <span> Gmail: {khachHang.gmail}</span></span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <button className="nut-xoa">Tùy</button>
      </div>     
    </div>
  );
}


export function CardItemSanPham({sanPham}) {
  return (
     <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="package.svg" alt="Hình ảnh sản phẩm" />
      </div>
      <div className="thong-tin-card">
        <span className='ten-san-pham'>{sanPham.ten}</span>
        <span className='gia-san-pham'>{sanPham.gia} Đ /{sanPham.donvi} </span>
        <span className='mo-ta-san-pham'>Mô tả: {sanPham.moTa}</span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <button className="nut-xoa">Tùy</button>
      </div>     
    </div>
  );
}
export function CardItemDonHang({donHang}) {
  return (
     <div className="card-item">
      <div className="hinh-anh-khach-hang">
        <img src="invoice.svg" alt="Hình ảnh sản phẩm" />
      </div>
      <div className="thong-tin-card">
        <span className='ten-san-pham'>{donHang.tenKhachHang}</span>
        <span className='gia-san-pham'>{donHang.tongTien} </span>
        <span className='mo-ta-san-pham'>Mô tả: {donHang.moTa}</span>
      </div>
      <div className="thanh-nut">
        <button className="nut-chinh-sua">thích</button>
        <button className="nut-xoa">Tùy</button>
      </div>     
    </div>
  );
}

