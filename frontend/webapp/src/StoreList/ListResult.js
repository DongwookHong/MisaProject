import React from 'react';
import '../style/StoreList/ListResult.css';
import { Link } from 'react-router-dom';

const ListResult = ({ stores }) => {
  return (
    <div className="listResult-container">
      <div className="store-list">
        {stores.map((store) => (
          <Link
            key={store.storeName}
            to={`/storeinfo/${store.storeName}`}
            className="store-card-link">
            <StoreCard store={store} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const StoreCard = ({ store }) => {
  const getFloorDisplay = (floorNumber) => {
    console.log(floorNumber);
    if (floorNumber == 0) {
      return 'B1층';
    } else {
      return `${floorNumber}층`;
    }
  };

  const getModifiedBuildingDong = (dong) => {
    if (dong === 'A') return '12BL';
    if (dong === 'B') return '11BL';
    return dong; // Return original value if not A or B
  };

  return (
    <div className="store-card">
      <img
        src={store.storeImage}
        alt={store.storeName}
        className="store-image"
      />
      <div className="store-section">
        <h3 className="store-name">{store.storeName}</h3>
        <p className="store-address">
          {store.buildingName} {getModifiedBuildingDong(store.buildingDong)}{' '}
          {getFloorDisplay(store.floorNumber)}
        </p>
      </div>
    </div>
  );
};

export default ListResult;