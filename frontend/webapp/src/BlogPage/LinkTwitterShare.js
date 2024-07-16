import React from 'react';
import Twitter from '../asset/share/twitter.png';

function TwitterShare({ url, title, className }) {
  const share = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      '_blank'
    );
  };

  return (
    <button className="sns-icon" onClick={share}>
      <img src={Twitter} alt="Twitter" className="sns-icon" />
    </button>
  );
}

export default TwitterShare;
