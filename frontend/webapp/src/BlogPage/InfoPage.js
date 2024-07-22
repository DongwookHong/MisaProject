import React, { useState, useMemo, useEffect } from 'react';
import { LuShare, LuChevronDown, LuChevronUp, LuMapPin } from 'react-icons/lu';

function InfoPage({
  store_name,
  building_name,
  building_dong,
  floor_number,
  storeHours,
  store_number,
  insta_path,
  home_page_path,
  store_info,
  handleShare,
  location_info,
  blockId,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [floorImage, setFloorImage] = useState(null);

  useEffect(() => {
    const fetchFloorImage = async () => {
      try {
        const response = await fetch(`/api/find-spot/${blockId}`);
        const data = await response.json();
        if (data && data.floorImage) {
          setFloorImage(data.floorImage);
        }
      } catch (error) {
        console.error('Error fetching floor image:', error);
      }
    };

    if (blockId) {
      fetchFloorImage();
    }
  }, [blockId]);

  const getFloorDisplay = (floorNum) => {
    const num = Number(floorNum);
    return num === 0 ? 'B1F' : `${num}F`;
  };

  const formatTime = (time) => {
    return time === '00:00' ? '24:00' : time;
  };

  const daysOrder = ['일', '월', '화', '수', '목', '금', '토'];
  
  const sortedStoreHours = useMemo(() => {
    const today = new Date().getDay();
    return [...storeHours].sort((a, b) => {
      const aIndex = daysOrder.indexOf(a.dayOfWeek);
      const bIndex = daysOrder.indexOf(b.dayOfWeek);
      return (aIndex - today + 7) % 7 - (bIndex - today + 7) % 7;
    });
  }, [storeHours]);

  const renderBusinessHours = () => {
    const today = new Date().getDay();
    const todayKorean = daysOrder[today];

    return sortedStoreHours.map((day, index) => (
      <p key={day.dayOfWeek} className={`business-day-info ${day.dayOfWeek === todayKorean ? 'today' : ''}`}>
        <span className="day-label">{day.dayOfWeek}</span>
        {day.isOpen ? (
          <span className="time-info">
            {formatTime(day.openTime)} - {formatTime(day.closeTime)}
          </span>
        ) : (
          <span className="time-info closed">휴무</span>
        )}
      </p>
    ));
  };

  const getCurrentBusinessStatus = () => {
    const now = new Date();
    const todayKorean = daysOrder[now.getDay()];
    const todayHours = storeHours.find(day => day.dayOfWeek === todayKorean);
    
    if (!todayHours || !todayHours.isOpen) return '영업 종료';
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const openTime = parseInt(todayHours.openTime.split(':')[0]) * 60 + parseInt(todayHours.openTime.split(':')[1]);
    const closeTime = parseInt(todayHours.closeTime.split(':')[0]) * 60 + parseInt(todayHours.closeTime.split(':')[1]);
    
    if (closeTime < openTime) {
      // 자정을 넘어가는 경우
      if (currentTime >= openTime || currentTime < closeTime) return '영업 중';
    } else {
      if (currentTime >= openTime && currentTime < closeTime) return '영업 중';
    }
    
    return '영업 종료';
  };

  const businessStatus = getCurrentBusinessStatus();

  // Modified to change building_dong display
  const getModifiedBuildingDong = (dong) => {
    if (dong === 'A') return '12BL';
    if (dong === 'B') return '11BL';
    return dong; // Return original value if not A or B
  };

  return (
    <>
      <div className="info-page">
        <div className="header">
          <div className="title-section">
            <h1 className="main-title">{store_name}</h1>
          </div>
          <div className="title-subsection">
            <h6 className="info_floor">
              {building_name} {getModifiedBuildingDong(building_dong)} {getFloorDisplay(floor_number)}
            </h6>
            <div className="share-button" onClick={handleShare}>
              <LuShare />
            </div>
          </div>
        </div>
        <hr className="light-line-full" />
        <div className="info-section">
          <div className="business-hours-container">
            <div className="business-hours-header" onClick={() => setIsExpanded(!isExpanded)}>
              <span className="label">영업시간</span>
              <span className="business-status">{businessStatus}</span>
              {isExpanded ? <LuChevronUp /> : <LuChevronDown />}
            </div>
            {isExpanded && (
              <div className="business-hours">
                {renderBusinessHours()}
              </div>
            )}
          </div>
          <p className="business-info">
            <span className="label">전화번호</span>
            <br />
            <a href={`tel:${store_number}`} className="info-text">
              {store_number}
            </a>
          </p>
          <p className="business-info">
            <a href={home_page_path || insta_path} className="homepage-link" target="_blank" rel="noopener noreferrer">
              홈페이지 바로가기
            </a>
          </p>
          <hr className="light-line-full" />
        </div>
        <div className="store-describe" style={{ whiteSpace: 'pre-line' }}>
          {store_info}
        </div>
        <hr className="light-line-full" />
      </div>
    </>
  );
}

export default InfoPage;