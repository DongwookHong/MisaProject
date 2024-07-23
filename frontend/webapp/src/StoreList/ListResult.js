import React, { useMemo } from 'react';
import '../style/StoreList/ListResult.css';
import { Link } from 'react-router-dom';

const ListResult = ({ stores }) => {
  const sortedStores = useMemo(() => {
    return [...stores].sort((a, b) => {
      // 먼저 매장 이름으로 정렬
      if (a.storeName < b.storeName) return -1;
      if (a.storeName > b.storeName) return 1;

      // 매장 이름이 같은 경우 건물 이름으로 정렬
      if (a.buildingName < b.buildingName) return -1;
      if (a.buildingName > b.buildingName) return 1;

      // 건물 이름이 같은 경우 동으로 정렬
      if (a.buildingDong < b.buildingDong) return -1;
      if (a.buildingDong > b.buildingDong) return 1;

      // 동이 같은 경우 층으로 정렬
      return a.floorNumber - b.floorNumber;
    });
  }, [stores]);

  return (
    <div className="listResult-container">
      <div className="store-list">
        {sortedStores.map((store) => (
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