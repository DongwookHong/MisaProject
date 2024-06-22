import React from 'react';
import LinkIcon from '../asset/share/link.png'; // 링크 아이콘을 사용합니다.

function LinkTo({ url, className }) {
  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => {
          alert('링크가 클립보드에 복사되었습니다!');
        },
        (err) => {
          console.error('링크 복사에 실패했습니다.', err);
        }
      );
    } else {
      // Fallback method for browsers that do not support navigator.clipboard
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('링크 복사에 실패했습니다.', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button className={className} onClick={copyToClipboard}>
      <img src={LinkIcon} alt="Copy Link" />
    </button>
  );
}

export default LinkTo;
