import React from 'react';
import Facebook from '../asset/share/facebook.png';

function FacebookShare({ url, quote, className }) {
  const share = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      '_blank'
    );
  };

  return (
    <button className={className} onClick={share}>
      <img src={Facebook} alt="Facebook" />
    </button>
  );
}

export default FacebookShare;
