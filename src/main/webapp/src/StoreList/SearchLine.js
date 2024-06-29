import React from 'react';
import '../style/StoreList/SearchLine.css';

function SearchLine({ count }) {
  return (
    <div className="searchline-container">
      <div className="searchresult">
        <span className="result-text">
          <span className="result-cnt">{count}</span> 개의 매장이
          검색되었습니다.
          <hr className="searchline" />
        </span>
      </div>
    </div>
  );
}

export default SearchLine;
