import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import '../style/FloorMenu/FloorMenu.css';

function BuildingSelector() {
  const { selectedBuilding, setSelectedBuilding } = useContext(AppContext);

  return (
    <div className="flex-dong justify-center mb-4 space-x-4">
      {['힐스테이트 A동', '힐스테이트 B동', '롯데캐슬'].map((building) => (
        <button
          key={building}
          className={`button ${
            selectedBuilding === building
              ? 'button-selected'
              : 'button-unselected'
          }`}
          onClick={() => setSelectedBuilding(building)}>
          {building}
        </button>
      ))}
    </div>
  );
}

export default BuildingSelector;
