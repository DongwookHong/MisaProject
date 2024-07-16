import React, { useEffect } from 'react';

import '../style/BlogPage/ShareModal.css';
const KakaoShare = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('db29a84f61ac34638a6d3e017a32931e'); // 여기에 실제 카카오 앱 키를 입력하세요.
        // 카카오 공유 버튼 설정
        window.Kakao.Share.createCustomButton({
          container: '#kakaotalk-sharing-btn',
          templateId: 109256,
          templateArgs: {
            title: '제목 영역입니다.',
            description: '설명 영역입니다.',
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a id="kakaotalk-sharing-btn" href="javascript:;" className="sns-icon">
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼"
      />
    </a>
  );
};

export default KakaoShare;
