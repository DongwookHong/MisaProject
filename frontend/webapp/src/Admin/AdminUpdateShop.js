import React, { useState, useEffect } from 'react';
import './AdminUpdateShop.css';

const AdminFixShop = ({ shop, onUpdate, onCancel }) => {
  const [editedShop, setEditedShop] = useState(shop);

  useEffect(() => {
    setEditedShop(shop);
  }, [shop]);

  const handleChange = (e) => {
    setEditedShop({ ...editedShop, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedShop);
  };

  return (
    <div className="admin-fix-shop">
      <h2>상점 수정</h2>
      <form onSubmit={handleSubmit}>
        <input name="storeName" value={editedShop.storeName} onChange={handleChange} placeholder="상점 이름" required />
        <input name="buildingName" value={editedShop.buildingName} onChange={handleChange} placeholder="건물 이름" required />
        {/* 다른 필드들도 유사하게 추가 */}
        <button type="submit">수정</button>
        <button type="button" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
};

export default AdminFixShop;