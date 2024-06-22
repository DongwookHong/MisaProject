import React, { useState } from 'react';
import '../style/SearchMenu/SearchLine.css';

function SearchLine() {
  return (
    <>
      <div className="searchline-container">
        <div className="searchresult">
          <span className="result-text">
            <span className="result-cnt">12</span> 개의 매장이 검색되었습니다.
            <hr className="searchline" />
          </span>
        </div>
      </div>
    </>
  );
}

export default SearchLine;

/*
여기서 매개변수로 받아서 0개면 매장을 찾을 수 없습니다. 가 떠야함 

*/
