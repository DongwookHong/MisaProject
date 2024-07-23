import React, { useState } from 'react';
import './AdminAddShop.css';

const AdminAddShop = ({ onAdd }) => {
  const [shop, setShop] = useState({
    buildingName: '', buildingDong: '', floor: '', blockId: '', storeName: '',
    storeHours: [], businessHour: '', info: '', storeNumber: '',
    homePagePath: '', instaPath: '', storeAddress: '', files: []
  });

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(shop);
  };

  return (
    <div className="admin-add-shop">
      <h2>상점 추가</h2>
      <form onSubmit={handleSubmit}>
        <input name="storeName" value={shop.storeName} onChange={handleChange} placeholder="상점 이름" required />
        <input name="buildingName" value={shop.buildingName} onChange={handleChange} placeholder="건물 이름" required />
        {/* 다른 필드들도 유사하게 추가 */}
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default AdminAddShop;