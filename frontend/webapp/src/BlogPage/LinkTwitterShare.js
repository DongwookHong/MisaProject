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
    <button className={className} onClick={share}>
      <img src={Twitter} alt="Twitter" />
    </button>
  );
}

export default TwitterShare;
