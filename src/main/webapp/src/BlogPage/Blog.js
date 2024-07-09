import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainFooter from '../Fix/MainFooter.js';
import MainHeader from '../Fix/MainHeader.js';
import ShareModal from './ShareModal.js';
import Slide from './BlogPhotoSlide.js';
import InfoPage from './InfoPage';
import jsonData from '../test.json'; // JSON 파일 가져오기

function Blog() {
  const { id } = useParams(); // URL 파라미터에서 상점 ID를 가져옴
  const [store, setStore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shareData, setShareData] = useState({});

  useEffect(() => {
    const storeData = jsonData.find((item) => item.id.toString() === id);
    setStore(storeData);
  }, [id]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: store.store_name,
      text: `Check out this amazing place: ${store.info}`,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setShareData(shareData); // 공유 데이터를 상태로 설정
        handleShowModal();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!store) {
    return <div>잘못된 페이지 접근입니다.</div>; // 데이터가 로드되지 않은 경우 로딩 메시지 표시
  }

  return (
    <>
      <MainHeader />
      <div className="blog-card">
        <InfoPage
          store_name={store.store_name}
          building_name={store.building_name}
          building_dong={store.building_dong}
          floor_number={store.floor_number}
          business_hour={store.business_hour}
          store_number={store.store_number}
          insta_path={store.insta_path}
          store_info={store.store_info}
          handleShare={handleShare}
        />
        <Slide />
        <ShareModal
          show={showModal}
          handleClose={handleCloseModal}
          shareData={shareData}
        />
        <MainFooter />
      </div>
    </>
  );
}

export default Blog;
