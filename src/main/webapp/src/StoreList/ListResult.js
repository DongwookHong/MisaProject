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
          {store.buildingName} {store.buildingDong} {store.floorNumber}층
        </p>
      </div>
    </div>
  );
};

export default ListResult;