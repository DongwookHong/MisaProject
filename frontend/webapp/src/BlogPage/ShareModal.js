import React from 'react';
import { Modal } from 'react-bootstrap';
import KakaoShare from './LinkKakaoShare.js';
import FacebookShare from './LinkFacebookShare.js';
// import TwitterShare from './LinkTwitterShare.js';
import LinkTo from './LinkAll.js';
import '../style/BlogPage/ShareModal.css';

function ShareModal({ show, handleClose }) {
  const currentUrl = window.location.href;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>공유하기</Modal.Title>
        <button className="custom-close-button" onClick={handleClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="share-options">
          <KakaoShare
            templateId="1095033"
            title="제목 영역입니다."
            description="설명 영역입니다."
            className="sns-icon"
          />
          <FacebookShare
            url={currentUrl}
            quote="제목 영역입니다."
            className="sns-icon"
          />
          {/* <TwitterShare
            url={currentUrl}
            title="제목 영역입니다."
            className="sns-icon"
          /> */}
          <LinkTo url={currentUrl} className="sns-icon link-to-icon" />
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default ShareModal;
