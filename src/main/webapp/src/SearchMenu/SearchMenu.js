import React from 'react';

import MainHeader from '../Fix/MainHeader';
import SearchBar from './SearchBar';
import SearchLine from './SearchLine';
import SearchList from './SearchList';

function SearchMenu() {
  return (
    <>
      <MainHeader />
      <SearchBar />
      <SearchLine />
      <SearchList />
    </>
  );
}

export default SearchMenu;
