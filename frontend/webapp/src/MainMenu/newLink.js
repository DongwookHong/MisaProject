import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './newLink.css';

function NewLink() {
  return (
    <>
      <div className="newLink-container">
        <div className="newLink-item">
          <div className="newLink-text-hill">
            <span className="newLink-empha">힐</span>스테이트
          </div>
          <Link
            to="/floormenu?building=힐스테이트 A동&floor=1"
            className="newLink-baro">
            11BL 바로가기 <span className="newLink-arrow">&gt;</span>
          </Link>
          <Link
            to="/floormenu?building=힐스테이트 A동&floor=1"
            className="newLink-baro">
            12BL 바로가기 <span className="newLink-arrow">&gt;</span>
          </Link>
          <div className="newLink-text-lotte">
            <span className="newLink-empha">롯데</span>캐슬
          </div>
          <Link
            to="/floormenu?building=힐스테이트 A동&floor=1"
            className="newLink-baro">
            롯데 바로가기 <span className="newLink-arrow">&gt;</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NewLink;
