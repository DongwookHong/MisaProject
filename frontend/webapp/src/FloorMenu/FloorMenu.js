import React from 'react';
import { AppProvider } from './AppContext';
import BuildingSelector from './BuildingSelector';
import FloorSelector from './FloorSelector';
import TenantList from './TenantList';
import FloorImage from './FloorImage';
import MainHeader from '../Fix/MainHeader.js';
import MainFooter from '../Fix/MainFooter.js';
import '../style/FloorMenu/FloorMenu.css';

function FloorMenu() {
  return (
    <>
      <MainHeader />
      <AppProvider>
        <div
          className="bg-white text-gray-900 min-h-screen flex items-center justify-center"
          style={{ paddingTop: '100px' }}>
          <div className="dong-container">
            <div className="dong-announce-container">
              <div className="text-center mb-4">
                <h1 className="dong-announce-head">동별안내</h1>
              </div>
            </div>
            <BuildingSelector />
            <div className="map_button-container">
              <FloorImage />
            </div>
            <div className="rounded relative">
              <div className="flex">
                <FloorSelector />
                <TenantList />
              </div>
            </div>
          </div>
        </div>
        <MainFooter></MainFooter>
      </AppProvider>
    </>
  );
}
export default FloorMenu;
