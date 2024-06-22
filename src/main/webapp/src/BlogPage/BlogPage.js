import React, { useState } from 'react';

import { LuShare } from 'react-icons/lu';
import '../style/BlogPage/BlogPage.css';
import { AiOutlineClockCircle, AiOutlinePhone } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import Carousels from './Carousels.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
// import { FaTwitter, FaFacebook, FaInstagram, FaLink } from 'react-icons/fa';
import MainFooter from '../Fix/MainFooter.js';
import MainHeader from '../Fix/MainHeader.js';
import externalLinkIcon from '../asset/tool/external-link.png';
import Slide from './Slide.js';
import ShareModal from './ShareModal.js';
// import ShareModal2 from './ShareModal_demo.js';

function Blog() {
  const [showModal, setShowModal] = useState(false);
  // const history = useHistory();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: 'Ninety One',
      text: 'Check out this amazing place!',
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleShowModal();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      <MainHeader />
      <div className="blog-card">
        <div className="header">
          <div className="title-section">
            <h1 className="main-title">91 미사</h1>
          </div>
          <div className="title-subsection">
            <h6 className="info_floor">힐스테이트 그랑파사쥬 1F</h6>
            <div className="share-button" onClick={handleShare}>
              <LuShare />
            </div>
          </div>
        </div>
        <hr className="light-line-full" />
        <div className="info-section">
          <p className="business-info">
            {/* <AiOutlineClockCircle className="icon" />{' '} */}
            <span className="label">영업시간</span>
            <br />
            <span className="info-text">17:00~02:00</span>
          </p>
          <p className="business-info">
            {/* <AiOutlinePhone className="icon" />{' '} */}
            <span className="label">전화번호</span>
            <br />
            <a href="tel:010-1234-5678" className="info-text">
              010-1234-5678
            </a>
          </p>
          <p className="business-info">
            <a
              href="https://www.instagram.com/91_misa?igsh=MXJ4ZHlxbm1xNzFsMw=="
              className="homepage-link">
              홈페이지 바로가기
            </a>
          </p>
          <hr className="light-line-full" />
        </div>
        <div className="store-describe">
          모던 현대적인 퓨전음식 술집 <br></br>지금 까지 경험해보지못한
          만나보지못한 비쥬얼,맛 경험 해보세요
        </div>
        <hr className="light-line-full" />
        {/* <Carousels /> */}
        <Slide />
        <ShareModal show={showModal} handleClose={handleCloseModal} />
        {/* <ShareModal isVisible={showModal} handleClose={handleCloseModal} /> */}
        {/* <ShareModal isVisible={showModal} handleClose={handleCloseModal} /> */}
        {/* <ShareModal2 /> */}
        <MainFooter />
      </div>
    </>
  );
}

// function ShareModal({ show, handleClose }) {
//   const currentUrl = window.location.href;

//   const shareToTwitter = () => {
//     const shareText = encodeURIComponent('Check out this amazing place!');
//     const twitterUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;
//     window.open(twitterUrl, '_blank');
//   };

//   const shareToFacebook = () => {
//     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
//     window.open(facebookUrl, '_blank');
//   };

//   const shareToInstagram = () => {
//     const instagramUrl = `https://www.instagram.com/`;
//     navigator.clipboard.writeText(currentUrl).then(() => {
//       alert('Link copied to clipboard! Share it on Instagram.');
//     });
//     window.open(instagramUrl, '_blank');
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard
//       .writeText(currentUrl)
//       .then(() => {
//         alert('Link copied to clipboard!');
//       })
//       .catch((error) => {
//         console.error('Error copying link:', error);
//       });
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Share</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="share-options">
//           <Button
//             variant="outline-primary"
//             className="share-button"
//             onClick={shareToTwitter}>
//             <FaTwitter /> Twitter
//           </Button>
//           <Button
//             variant="outline-primary"
//             className="share-button"
//             onClick={shareToFacebook}>
//             <FaFacebook /> Facebook
//           </Button>
//           <Button
//             variant="outline-danger"
//             className="share-button"
//             onClick={shareToInstagram}>
//             <FaInstagram /> Instagram
//           </Button>
//           <Button
//             variant="outline-secondary"
//             className="share-button"
//             onClick={handleCopyLink}>
//             <FaLink /> Copy Link
//           </Button>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

export default Blog;
