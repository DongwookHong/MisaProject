import { useEffect } from 'react';

const useSNSShare = ({ title, url, option }) => {
  const shareToTwitter = () => {
    const sharedLink =
      'text=' + encodeURIComponent(title + ' \n ') + encodeURIComponent(url);
    openWindow(`https://twitter.com/intent/tweet?${sharedLink}`);
  };

  const shareToFacebook = () => {
    const sharedLink = encodeURIComponent(url);
    openWindow(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
  };

  const shareToKakaoTalk = () => {
    if (window.Kakao === undefined) {
      return;
    }

    const kakao = window.Kakao;

    // 중복 initialization 방지
    if (!kakao.isInitialized()) {
      // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
      kakao.init('db29a84f61ac34638a6d3e017a32931e');
    }

    kakao.Share.sendDefault({
      objectType: 'text',
      text: title,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    });
  };

  const shareToNavigator = ({ text, url }) => {
    const sharedData = {
      text: text,
      url: url,
    };

    try {
      if (navigator.canShare && navigator.canShare(sharedData)) {
        navigator
          .share(sharedData)
          .then(() => {
            console.log('성공');
          })
          .catch(() => {
            console.log('취소');
          });
      }
    } catch (e) {
      console.log('실패');
    }
  };

  const openWindow = (url) => {
    window.open(url, option?.windowOpenTarget || '_blank');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return {
    isAvailNavigator: typeof navigator.share !== 'undefined',
    shareToTwitter,
    shareToFacebook,
    shareToKakaoTalk,
    shareToNavigator,
  };
};

export default useSNSShare;
