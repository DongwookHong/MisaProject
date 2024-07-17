import React from 'react';
import { LuShare } from 'react-icons/lu';

function InfoPage({
  store_name,
  building_name,
  building_dong,
  floor_number,
  business_hour,
  store_number,
  insta_path,
  store_info,
  handleShare,
}) {
  const getFloorDisplay = (floorNum) => {
    const num = Number(floorNum);
    if (num == 0) {
      return 'B1F';
    } else {
      return `${num}F`;
    }
  };
  return (
    <>
      <div>
        <div className="header">
          <div className="title-section">
            <h1 className="main-title">{store_name}</h1>
          </div>
          <div className="title-subsection">
            <h6 className="info_floor">
              {building_name} {building_dong} {getFloorDisplay(floor_number)}
            </h6>
            <div className="share-button" onClick={handleShare}>
              <LuShare />
            </div>
          </div>
        </div>
        <hr className="light-line-full" />
        <div className="info-section">
          <p className="business-info">
            <span className="label">영업시간</span>
            <br />
            <span className="info-text">{business_hour}</span>
          </p>
          <p className="business-info">
            <span className="label">전화번호</span>
            <br />
            <a href={`tel:${store_number}`} className="info-text">
              {store_number}
            </a>
          </p>
          <p className="business-info">
            <a href={insta_path} className="homepage-link">
              홈페이지 바로가기
            </a>
          </p>
          <hr className="light-line-full" />
        </div>
        <div className="store-describe" style={{ whiteSpace: 'pre-line' }}>
          {store_info}{' '}
        </div>
        <hr className="light-line-full" />
      </div>
    </>
  );
}

export default InfoPage;
