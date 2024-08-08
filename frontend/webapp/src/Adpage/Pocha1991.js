import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, MapPin, Music, Utensils, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Pic1 from '../asset/pocha/pic1.webp';
import Pic2 from '../asset/pocha/pic2.jpg';
import Pic3 from '../asset/pocha/pic3.jpg';
import Pic4 from '../asset/pocha/pic4.jpg';
import Pic5 from '../asset/pocha/pic5.jpg';
import './Pocha1991.css';

const Pocha1991 = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const menuData = {
    "메인 요리": [
      { "name": "김치전", "price": 13000 },
      { "name": "제육볶음", "price": 13000 },
      { "name": "가문어구이", "price": 9900 },
      { "name": "스지사태수육", "price": 16000 },
      { "name": "차돌숙주볶음", "price": 18900 },
      { "name": "감바스바게트", "price": 19900 },
      { "name": "닭똥집", "price": 18900 },
      { "name": "치즈오돌뼈", "price": 17900 },
      { "name": "크림돈까스파스타", "price": 21900 },
      { "name": "로제돈까스파스타", "price": 21900 },
      { "name": "항정수육", "price": 15000 },
      { "name": "대갈통", "price": 32000 },
      { "name": "옛날통닭", "price": 16900 },
      { "name": "고갈비구이", "price": 16000 },
      { "name": "쭈꾸미볶음", "price": 19800 }
    ],
    "사이드 메뉴": [
      { "name": "계란말이", "price": 13000 },
      { "name": "간장계란밥", "price": 5000 },
      { "name": "날치알주먹밥", "price": 4000 },
      { "name": "먹태와땅콩", "price": 14900 },
      { "name": "반건조오징어", "price": 14900 },
      { "name": "튀김쥐포", "price": 5900 },
      { "name": "분식꼬치세트", "price": 15000 },
      { "name": "참치마요덮밥", "price": 6000 },
      { "name": "불계치", "price": 6000 },
      { "name": "골뱅이쫄면", "price": 18900 }
    ],
    "찌개 & 전골": [
      { "name": "차돌샤브전골", "price": 21900 },
      { "name": "해물짬뽕탕", "price": 21900 },
      { "name": "꼬불이오뎅탕", "price": 19000 },
      { "name": "닭전골", "price": 21900 },
      { "name": "순두부찌개", "price": 21900 },
      { "name": "삼겹두부김치", "price": 18900 },
      { "name": "해물라면", "price": 8000 },
      { "name": "즉석떡볶이", "price": 21900 }
    ],
    "음료 & 디저트": [
      { "name": "음료수", "price": 2000 },
      { "name": "팥빙수", "price": 5000 },
      { "name": "아이스크림", "price": 5000 },
      { "name": "딸기후르츠황도", "price": 8900 },
      { "name": "파인애플샤베트", "price": 8900 }
    ]
  };
  const handleViewLocation = () => {
    navigate('/storeinfo/1991 포장마차');
  };
  return (
    <div className="pocha-container">
      <div className="pocha-content">
        <div className="pocha-header">
          <h1>1991 포장마차</h1>
          <p>미사의 힙한 레트로 포차</p>
        </div>
        
        <div className="pocha-main-content">
          <p className="pocha-paragraph">
            90년대의 향수와 현대적 감성이 어우러진 1991 포장마차에서
            추억의 맛과 분위기를 경험해보세요. <br/>
            옛날 감성 그대로, 하지만 더욱 세련되게.
          </p>
          
          <div className="pocha-feature-grid">
            <FeatureCard icon={<Music />} title="레트로 음악">
              90년대 감성의 음악으로 시간여행
            </FeatureCard>
            <FeatureCard icon={<Utensils />} title="정통포차요리">
              현대적으로 재해석한 포장마차 스타일 요리
            </FeatureCard>
            <FeatureCard icon={<Users />} title="소셜 다이닝">
              친구들과 함께 즐기기 좋은 공간
            </FeatureCard>
            <FeatureCard icon={<MapPin />} title="편리한 위치">
              미사강변도시 중심부에 위치
            </FeatureCard>
          </div>
          
          <div className="pocha-gallery">
            <h2>갤러리</h2>
            <div className="pocha-image-container">
              <img src={Pic1} alt="1991 포장마차 내부" />
              <img src={Pic2} alt="1991 포장마차 외부" />
              <img src={Pic3} alt="1991 포장마차 로고" />
              <img src={Pic4} alt="1991 포장마차 메뉴" />
              <img src={Pic5} alt="1991 포장마차 분위기" />
            </div>
          </div>
          
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="pocha-menu-button"
          >
            <span>메뉴 보기</span>
            {showMenu ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          
          {showMenu && (
            <div className="pocha-menu-list">
              {Object.entries(menuData).map(([category, items]) => (
                <div key={category} className="pocha-menu-category">
                  <h3>{category}</h3>
                  {items.map((item, index) => (
                    <div key={index} className="pocha-menu-item">
                      <span>{item.name}</span>
                      <span>{item.price.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          
          <div className="pocha-location">
            <h2>오시는 길</h2>
            <p>
              경기 하남시 미사강변동로 95 1039호<br />
              (망월동, 힐스테이트 미사역 그랑파사쥬 12BL)
            </p>
            <button onClick={handleViewLocation} className="pocha-location-button">
              위치 상세보기
            </button>
          </div>
          
          <div className="pocha-instagram-button-container">
            <a href="https://www.instagram.com/1991_misapocha" target="_blank" rel="noopener noreferrer" className="pocha-instagram-button">
              <Instagram style={{ marginRight: '8px' }} size={24} />
              <span>인스타그램에서 더 보기</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, children }) => {
  return (
    <div className="pocha-feature-card">
      <div className="pocha-feature-icon-container">
        {React.cloneElement(icon, { size: 20, style: { color: '#7C3AED' } })}
      </div>
      <div className="pocha-feature-content">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Pocha1991;