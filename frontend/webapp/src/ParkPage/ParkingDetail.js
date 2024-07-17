import React, { useState } from 'react';
import '../style/ParkPage/ParkingDetail.css';

function ParkingDetail() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // 이미 열려있는 것을 클릭하면 닫기
    } else {
      setActiveIndex(index); // 클릭한 항목 열기
    }
  };

  return (
    <div className="accordion-container">
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => toggleAccordion(0)}>
          <h2>주차장 이용안내</h2>
          <span>{activeIndex === 0 ? '▲' : '▼'}</span>
        </div>
        {activeIndex === 0 && (
          <div className="accordion-content">
            <h3>주차요금</h3>
            <p className="custom-p">본관:</p>
            <ul>
              <li>최초 1시간 무료 (매 10분 당 1,000원)</li>
            </ul>
            <p className="custom-p">공영주차장:</p>
            <ul>
              <li>최초 1시간 무료 (추가 10분당 300원)</li>
            </ul>
            <h3>상품금액별 무료 주차 안내</h3>
            <ul>
              <li>매장이용시 1시간 반</li>
              <li>매장이용시 최대 3시간</li>
              <li>영화관람 시: 3시간(추가 10분당 1,000원)</li>
            </ul>
            <h3>문의전화</h3>
            <p className="custom-p">주차관리실 02-xxxx-xxxx</p>
            <p className="custom-p">
              주말/공휴일 공영주차장 이용시 구매 금액에 따라 요금 정산 (본관 1F
              정문 안내데스크)
            </p>
          </div>
        )}
      </div>
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => toggleAccordion(1)}>
          <h2>지하철 이용 시</h2>
          <span>{activeIndex === 1 ? '▲' : '▼'}</span>
        </div>
        {activeIndex === 1 && (
          <div className="accordion-content">
            <p className="custom-p"> 지하철 5호선</p>
            <p className="custom-p">2번출구에서 바로 연결</p>
            <p className="custom-p">1번출구에서 바로 연결</p>
          </div>
        )}
      </div>
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => toggleAccordion(2)}>
          <h2>버스 이용 시</h2>
          <span>{activeIndex === 2 ? '▲' : '▼'}</span>
        </div>

        {activeIndex === 2 && (
          <div className="accordion-content">
            <p className="custom-p">직행: 9302, 9304 </p>
            <p className="custom-p">일반: 1-4, 81, 87, 89</p>
            <p className="custom-p">마을: 3-1, 3-2, 5, 10, 50</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingDetail;
