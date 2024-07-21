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
                <h3>홈페이지 제작</h3>
                <p>홈페이지 제작 및 웹사이트 제작</p>
              </div>
            </div>
          </div>
          <div className="find-ad-contact-us">
            <h2 className="find-ad-subtitle">광고 문의</h2>
            <p>이메일: xxx@misarodeo.com</p>
            <a href="https://open.kakao.com/o/sNyXo9Dg" target="_blank" rel="noopener noreferrer" className="find-ad-contact-button">
              카카오톡 오픈채팅 상담
            </a>
          </div>
        </div>
      </div>
      <div className="copyright-notice">
        © 2024 하남 미사 로데오 거리. 무단 배포 및 사용을 금지합니다.
      </div>
      <MainFooter />
    </>
  );
}

export default FindAD;