import React, { createContext, useState, useRef } from 'react';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedBuilding, setSelectedBuilding] = useState('힐스테이트 A동');
  const [selectedFloor, setSelectedFloor] = useState('1F');
  const [showImage, setShowImage] = useState(false);
  const canvasRef = useRef(null);

  const floorLists = {
    '3F': [
      'Tenant 1',
      'Tenant 2',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
    ],
    '2F': [
      'Tenant 4',
      'Tenant 5',
      'Tenant 6',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
      'Tenant 3',
    ],
    '1F': [
      '91 미사',
      '쥬씨',
      '용용선생',
      '바이아연',
      '오늘은 깨끗',
      '슈올린 안경',
      '배민 도화',
      '킴 공인중개사',
      '골방이 상회',
      'test',
    ],
    B1: ['Tenant 7', 'Tenant 8'],
    B2: ['Tenant 9', 'Tenant 10'],
  };

  return (
    <AppContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        selectedFloor,
        setSelectedFloor,
        showImage,
        setShowImage,
        canvasRef,
        floorLists,
      }}>
      {children}
    </AppContext.Provider>
  );
};
