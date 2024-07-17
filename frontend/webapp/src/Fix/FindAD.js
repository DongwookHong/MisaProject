import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import '../style/Fix/FindAD.css';

function FindAD() {
  return (
    <>
        <MainHeader />
      <div className="find-ad-page-container">
      <div className="find-ad-content">
        <h1 className="find-ad-title">온라인 배너 광고주 모집</h1>
        <p className="find-ad-description">하남 미사 로데오 거리 웹사이트에서 귀사의 브랜드를 빛내세요!</p>
        <div className="find-ad-benefits">
          <h2 className="find-ad-subtitle">온라인 광고 혜택</h2>
          <ul>
            <li>하남 미사 로데오 거리 웹사이트 방문자에게 노출</li>
            <li>타겟 고객층에 맞춘 배너광고 수립 지원</li>
            <li>합리적인 가격으로 효과적인 온라인 마케팅</li>
          </ul>
        </div>
        <div className="find-ad-types">
          <h2 className="find-ad-subtitle">온라인 광고 유형</h2>
          <div className="find-ad-type-grid">
            <div className="find-ad-type">
              <h3>배너 광고</h3>
              <p>웹사이트 주요 위치에 배너 광고 게재</p>
            </div>
            <div className="find-ad-type">
              <h3>팝업 광고</h3>
              <p>주목도 높은 팝업 형태의 광고</p>
            </div>
            <div className="find-ad-type">
              <h3>스폰서 콘텐츠</h3>
              <p>브랜드 관련 특집 기사 및 콘텐츠 제작</p>
            </div>
          
          </div>
        </div>
        <div className="find-ad-contact-us">
          <h2 className="find-ad-subtitle">광고 문의</h2>
          <p>전화: 031-xxx-0352</p>
          <p>이메일: xxx@misarodeo.com</p>
          <button className="find-ad-contact-button">온라인 상담 신청</button>
        </div>
      </div>
    </div>
      <MainFooter />
    </>
  );
}

export default FindAD;