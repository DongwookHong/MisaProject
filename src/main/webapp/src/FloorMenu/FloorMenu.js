import React from 'react';
import { AppProvider } from './AppContext';
import BuildingSelector from './BuildingSelector';
import FloorSelector from './FloorSelector';
import TenantList from './TenantList';
import FloorImage from './FloorImage';

function FloorMenu() {
  return (
    <AppProvider>
      <div className="bg-white text-gray-900 min-h-screen flex items-center justify-center">
        <div className="dong-container">
          <div className="text-center mb-4">
            <h1 className="head">동별 안내</h1>
          </div>
          <BuildingSelector />
          <div className="map_button-container">
            <FloorImage />
          </div>
          <div className="border rounded overflow-hidden relative">
            <div className="flex">
              <FloorSelector />
              <TenantList />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
export default FloorMenu;
