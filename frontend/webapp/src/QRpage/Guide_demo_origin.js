import React, { useState } from 'react';
import '../style/QRpage/Guide_demo.css';
import locpin from '../asset/tool/locpin.png';

function Guide_demo({ onIconClick }) {
  const [activeSection, setActiveSection] = useState('facility');

  const facilityItems = ['화장실', '엘레베이터', '에스컬레이터'];
  const storeItems = ['91MISA', 'Ninety One', '쥬씨', '용용선생'];
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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
          <FacilityContent items={facilityItems} onIconClick={onIconClick} />
        )}
        {activeSection === 'guide' && (
          <FacilityContent items={storeItems} onIconClick={onIconClick} />
        )}
      </div>
    </div>
  );
}

function FacilityContent({ items, onIconClick }) {
  return (
    <div className="facility-content">
      {items.map((item, index) => (
        <div className="facility-item" key={index}>
          {item}
          <span className="logospace" onClick={() => onIconClick('misa')}>
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide_demo;
