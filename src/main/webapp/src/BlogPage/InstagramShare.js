import React from 'react';
import useSNSShare from './UseSNSShare';
imp;

const InstagramShare = () => {
  const { shareToNavigator } = useSNSShare({
    title: '제목 영역입니다.',
    url: window.location.href,
    option: { windowOpenTarget: '_blank' },
  });

  const shareToInstagram = () => {
    shareToNavigator({ text: 'Check this out!', url: window.location.href });
  };

  return (
    <button onClick={shareToInstagram}>
      <img
        src="https://path-to-your-instagram-icon/instagram-icon.png"
        alt="인스타그램 공유하기 버튼"
      />
    </button>
  );
};

export default InstagramShare;
