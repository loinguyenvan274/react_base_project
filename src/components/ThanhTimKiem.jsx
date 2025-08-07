import './css/ThanhTimKiem.css';

function ThanhTimKiem() {
  return (
    <div className="thanh-tim-kiem-container">
      <div className='thanh-tim-kiem'>
        <div className="thanh-tim-kiem-icon">
          <img src="search_1.svg" alt="Search Icon" />
        </div>
        <input type="text" placeholder="Tìm kiếm..." />
        <button className="nut-tim-kiem">Xóa</button>
      </div>
    </div>
  );
}
export { ThanhTimKiem };