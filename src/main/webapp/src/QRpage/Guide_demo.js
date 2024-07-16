import React, { useState, useMemo } from 'react';
import '../style/QRpage/Guide_demo.css';
import locpin from '../asset/tool/locpin.png';


function Guide_demo({ onIconClick, floorData }) {
  const [activeSection, setActiveSection] = useState('facility');

  const { facilityItems, storeItems } = useMemo(() => {
    const facilities = floorData.flatMap(floor => 
      floor.data.filter(item => item.type === 'facility').map(item => item.name)
    );
    const stores = floorData.flatMap(floor => 
      floor.data.filter(item => item.type === 'store').map(item => item.name)
    );
    return {
      facilityItems: [...new Set(facilities)],
      storeItems: [...new Set(stores)]
    };
  }, [floorData]);
// ======= main
// function Guide_demo({ data, onIconClick }) {
//   const [activeSection, setActiveSection] = useState('facility');
//   const [facilityItems, setFacilityItems] = useState([]);
//   const [storeItems, setStoreItems] = useState([]);

//   useEffect(() => {
//     const facilities = data.filter((item) => item.type === 'facility');
//     const stores = data.filter((item) => item.type === 'store');
//     setFacilityItems(facilities);
//     setStoreItems(stores);
//   }, [data]);
// >>>>>>> main

  return (
    <div className="guide-container">
      <div className="title-row">
        <div
          className={`facility-title ${activeSection === 'facility' ? 'active' : 'inactive'}`}
          onClick={() => setActiveSection('facility')}>
          편의시설
        </div>
        <div
          className={`guide-title ${activeSection === 'guide' ? 'active' : 'inactive'}`}
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
          {item.name}
          <span className="logospace" onClick={() => onIconClick(item)}>
            <img src={locpin} alt="loc" width="30" height="20" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Guide_demo;