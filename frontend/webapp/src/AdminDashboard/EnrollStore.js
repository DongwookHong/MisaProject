import React, { useState } from 'react';
import './EnrollStore.css';
import Select from 'react-select';
import OperationModal from './OperationModal.js';

function EnrollStore() {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: '#f0f0ff',
      boxShadow: 'none',
      borderRadius: '5px',
      height: '40px',
      minHeight: '40px',
      width: '20em',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#bdafff' : 'white',
      color: 'black',
    }),
  };
  const customStylesFloor = {
    ...customStyles,
    control: (provided) => ({
      ...provided,
      ...customStyles.control(provided),
      width: '10em',
      minHeight: '40px',
      height: '40px',
    }),
  };
  const buildingOptions = [
    { value: '힐스테이트 12BL', label: '힐스테이트 12BL' },
    { value: '힐스테이트 11BL', label: '힐스테이트 11BL' },
    { value: '롯데캐슬', label: '롯데캐슬' },
  ];

  const floorOptions = [
    { value: 'B1층', label: 'B1층' },
    { value: '1층', label: '1층' },
    { value: '2층', label: '2층' },
    { value: '3층', label: '3층' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="enroll-container">
        <div className="enroll-header">
          <h2>매장등록</h2>
        </div>
        <div className="enroll-items">
          <div className="enroll-item">
            <h5 className="enroll-ask">매장이름</h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 이름을 정확히 입력해주세요"></input>
            <button className="submit-button">확인</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장위치</h5>
            <div className="enrollselect-container">
              <Select
                className="enroll-select-option"
                styles={customStyles}
                options={buildingOptions}
                placeholder="동 선택"
              />
              <Select
                className="enroll-select-option-floor"
                styles={customStylesFloor}
                options={floorOptions}
                placeholder="층 선택"
              />
            </div>
            <input
              className="enroll-input"
              placeholder="상세 호실 주소를 입력해주세요"></input>
            <button className="submit-button">확인</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">운영시간</h5>
            <div className="enroll-operationdata">
              <div
                className="operation-data"
                onClick={() => handleOptionClick('모든 영업일이 같아요')}>
                모든 영업일이 같아요
              </div>
              <div
                className="operation-data"
                onClick={() => handleOptionClick('평일/주말 달라요')}>
                평일/주말 달라요
              </div>
              <div
                className="operation-data"
                onClick={() => handleOptionClick('요일별로 달라요')}>
                요일별로 달라요
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <OperationModal option={selectedOption} onClose={closeModal} />
      )}
    </>
  );
}

export default EnrollStore;
