import { useState } from 'react';
import { KhachHangView } from './../components/MainContentHomePage/KhachHangView.jsx';
import { ThanhChuyenDoi } from './../components/ThanhChuyenDoi.jsx';
import './css/HomePage.css';

function HomePage() {

  const [MainContent, setMainContent] = useState(<KhachHangView />);
  return (
    <>
      <ThanhChuyenDoi setMainContent={setMainContent} />
      <div className="noi-dung">
        {MainContent}
       </div>
    </>
  )
}
export default HomePage;
