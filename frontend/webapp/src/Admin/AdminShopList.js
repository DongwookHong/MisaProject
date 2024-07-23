import React from 'react';
import './AdminShopList.css';

const AdminShopList = ({ stores, onEdit, onDelete }) => {
  return (
    <div className="admin-shop-list">
      <h2>상점 목록</h2>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            {store.storeName} - {store.buildingName}
            <button onClick={() => onEdit(store)}>수정</button>
            <button onClick={() => onDelete(store.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminShopList;