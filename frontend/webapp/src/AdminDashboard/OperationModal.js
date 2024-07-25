import React from 'react';

function OperationModal({ option, onClose }) {
  let content;

  console.log(option);

  switch (option) {
    case '모든 영업일이 같아요':
      content = (
        <>
          <h3>모든 영업일 설정</h3>
          {/* 모든 영업일이 같은 경우의 입력 필드들 */}
          {/* console.log(option); */}
        </>
      );
      break;
    case '평일/주말 달라요':
      content = (
        <>
          <h3>평일/주말 설정</h3>
          {/* 평일과 주말이 다른 경우의 입력 필드들 */}
        </>
      );
      break;
    case '요일별로 달라요':
      content = (
        <>
          <h3>요일별 설정</h3>
          {/* 요일별로 다른 경우의 입력 필드들 */}
        </>
      );
      break;
    default:
      content = null;
  }

  if (!content) return null;

  return (
    <div className="modal">
      {content}
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default OperationModal;
