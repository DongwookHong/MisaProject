import React, { useState } from 'react';
import '../style/MapGuide/Guide.css';

function Guide() {
  const [activeSection, setActiveSection] = useState('facility');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const facilityItems = ['화장실', '엘레베이터', '에스컬레이터'];
  const storeItems = ['91MISA', 'Ninety One', '쥬씨', '용용선생'];

  const handleIconClick = () => {
    setModalImage(`${process.env.PUBLIC_URL}/mapcollect/misa1.svg`);
    setShowModal(true);
  };

  return (
    <div className="guide-container">
      <div className="title-row">
        <div
          className={`facility-title ${
            activeSection === 'facility' ? 'active' : 'inactive'
          }`}
          onClick={() => setActiveSection('facility')}>
          편의시설
        </div>
        <div
          className={`guide-title ${
            activeSection === 'guide' ? 'active' : 'inactive'
          }`}
          onClick={() => setActiveSection('guide')}>
          매장안내
        </div>
      </div>
      <div className="content-row">
        {activeSection === 'facility' && (
          <FacilityContent
            items={facilityItems}
            onIconClick={handleIconClick}
          />
        )}
        {activeSection === 'guide' && (
          <FacilityContent items={storeItems} onIconClick={handleIconClick} />
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Modal" />
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FacilityContent(props) {
  return (
    <div className="facility-content">
      {props.items.map((item, index) => (
        <div className="facility-item" key={index}>
          {item}
          <span className="logospace" onClick={props.onIconClick}>
            <img src="/icon/locpin.png" alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide;
