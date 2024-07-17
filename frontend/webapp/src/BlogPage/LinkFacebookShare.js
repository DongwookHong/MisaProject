import React from 'react';
import Facebook from '../asset/share/facebook.png';
import '../style/BlogPage/ShareModal.css';

function FacebookShare({ url, quote, className }) {
  const share = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      '_blank'
    );
  };

  return (
    <button className="sns-icon" onClick={share}>
      <img src={Facebook} alt="Facebook" className="sns-icon" />
    </button>
  );
}

export default FacebookShare;
