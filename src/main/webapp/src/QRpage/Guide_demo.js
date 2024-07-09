import React, { useState, useEffect } from 'react';
import '../style/QRpage/Guide_demo.css';
import locpin from '../asset/tool/locpin.png';
import testJson from '../test.json'; // JSON 파일을 import
import test2Json from '../test2.json'; // JSON 파일을 import

function Guide_demo({ onIconClick }) {
  const [activeSection, setActiveSection] = useState('facility');
  const [facilityItems, setFacilityItems] = useState([]);
  const [storeItems, setStoreItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFacilityItems(
      test2Json
        .filter((item) => item.type === 'facility')
        .map((item) => item.facilityName)
    );
    setStoreItems(testJson.map((item) => item.store_name));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleIconClick = (itemName) => {
    console.log(itemName);
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
          <span className="logospace" onClick={() => onIconClick(item)}>
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide_demo;
