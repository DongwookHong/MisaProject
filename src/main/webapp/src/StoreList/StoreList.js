import React, { useState, useEffect } from 'react';
import MainHeader from '../Fix/MainHeader';
import MainFooter from '../Fix/MainFooter';
import ListSearchBar from './ListSearchBar';
import SearchLine from './SearchLine';
import ListStore from './ListResult';
import jsonData from '../test.json';

function StoreList() {
  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    // 모든 매장을 초기 상태로 설정
    setFilteredStores(jsonData);
  }, []);

  return (
    <>
      <MainHeader />
      <ListSearchBar setFilteredStores={setFilteredStores} />
      <SearchLine count={filteredStores.length} />
      <ListStore stores={filteredStores} />
      <MainFooter />
    </>
  );
}

export default StoreList;
