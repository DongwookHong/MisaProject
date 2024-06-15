import React from 'react';
import '../style/SearchMenu/SearchList.css';
import { Link } from 'react-router-dom';

const stores = [
  {
    id: 0,
    name: '퓨전술집 91',
    address: '힐스테이트 B동 1층',
    image: '/stores/store0.png',
  },
  {
    id: 1,
    name: '쥬씨',
    address: '힐스테이트 B동 1층',
    image: '/stores/store1.png',
  },
  {
    id: 2,
    name: '용용선생',
    address: '힐스테이트 B동 2층',
    image: '/stores/store2.png',
  },
  {
    id: 3,
    name: '바이아이언',
    address: '힐스테이트 B동 2층',
    image: '/stores/store3.png',
  },
  {
    id: 4,
    name: 'wonies',
    address: '힐스테이트 A동 3층',
    image: '/stores/store1.png',
  },
];

function SearchList() {
  return (
    <div className="searchlist-container">
      <div className="store-list">
        {stores.map((store, index) => (
          <StoreCard key={index} store={store} />
        ))}
      </div>
    </div>
  );
}

const StoreCard = ({ store }) => {
  return (
    <Link to={`/store${store.id}`}>
      <div className="store-card">
        <img src={store.image} alt={store.name} className="store-image" />
        <div className="store-info">
          <h3 className="store-name">{store.name}</h3>
          <p className="store-address">{store.address}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchList;
