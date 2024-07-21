import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MainFooter from '../Fix/MainFooter.js';
import MainHeader from '../Fix/MainHeader.js';
import ShareModal from './ShareModal.js';
import Slide from './BlogPhotoSlide.js';
import InfoPage from './InfoPage';
import '../style/BlogPage/BlogPage.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function Blog() {
  const { name } = useParams();
  const [store, setStore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shareData, setShareData] = useState({});
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const encodedName = encodeURIComponent(name);
        // const response = await axios.get(`https://api.misarodeo.com/api/store/${encodedName}`, {
          const response = await axios.get(`/api/store/${encodedName}`, {
          headers: {
            accept: '*/*',
            'x-api-key': API_KEY,
          },
        });
        console.log('API Response:', response.data);
        setStore(response.data);
        
        // Check for storeImage or storeImages
        if (response.data.storeImage) {
          const url = response.data.storeImage.startsWith('http') 
            ? response.data.storeImage 
            : `https://${response.data.storeImage}`;
          setImages([url]);
          console.log('Single Image URL:', url);
        } else if (Array.isArray(response.data.storeImages)) {
          const processedImages = response.data.storeImages.map(url => {
            if (typeof url === 'string') {
              return url.startsWith('http') ? url : `https://${url}`;
            }
            return null;
          }).filter(url => url !== null);
          
          setImages(processedImages);
          console.log('Processed Images:', processedImages);
        } else {
          console.warn('No valid image data found');
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        setError('상점 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchStoreData();
  }, [name]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: store.storeName,
      text: `Check out this amazing place: ${store.storeInfo}`,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setShareData(shareData);
        handleShowModal();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!store) {
    return <div>로딩 중...</div>;
  }

  console.log('Store data:', store);
  console.log('Images:', images);


  return (
    <>
      <MainHeader />
      <div className="blog-card">
        <InfoPage
        store_name={store.storeName}
        building_name={store.buildingName}
        building_dong={store.buildingDong}
        floor_number={store.floorNumber}
        storeHours={store.storeHours}
        store_number={store.storePhone}
        insta_path={store.instaPath}
        home_page_path={store.homePagePath}
        store_info={store.storeInfo}
        handleShare={handleShare}
        />

        {images.length > 0 && (
          <>
            <Slide imageUrls={images} />
          </>
        )}
        <ShareModal
          show={showModal}
          handleClose={handleCloseModal}
          shareData={shareData}
        />
      </div>
      <MainFooter />
    </>
  );
}

export default Blog;