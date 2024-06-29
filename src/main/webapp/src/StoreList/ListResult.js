import React from 'react';
import '../style/StoreList/ListResult.css';
import { Link } from 'react-router-dom';

const ListResult = ({ stores }) => {
  return (
    <div className="listResult-container">
      <div className="store-list">
        {stores.map((store) => (
          <Link
            key={store.id}
            to={`/storeinfo/${store.id}`}
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
        src={store.store_image}
        alt={store.store_name}
        className="store-image"
      />
      <div className="store-section">
        <h3 className="store-name">{store.store_name}</h3>
        <p className="store-address">
          {store.building_name} {store.building_dong} {store.floor_number}층
        </p>
      </div>
    </div>
  );
};

export default ListResult;
