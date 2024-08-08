import React, { useState, useRef, useEffect } from 'react';
import './EnrollStore.css';
import Select from 'react-select';
import OperationModal from './OperationModal.js';
import axios from 'axios';

function base64Encode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

function EnrollStore() {
  const [formData, setFormData] = useState({
    storeName: '',
    buildingName: '',
    buildingDong: '',
    floor: '',
    storeAddress: '',
    storeNumber: '',
    instaPath: '',
    homePagePath: '',
    info: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('모든 영업일이 같아요');
  const [storeHours, setStoreHours] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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
    {
      value: '힐스테이트 12BL',
      label: '힐스테이트 12BL',
      buildingName: '힐스테이트',
      buildingDong: 'A',
    },
    {
      value: '힐스테이트 11BL',
      label: '힐스테이트 11BL',
      buildingName: '힐스테이트',
      buildingDong: 'B',
    },
    {
      value: '롯데캐슬',
      label: '롯데캐슬',
      buildingName: '롯데캐슬',
      buildingDong: 'C',
    },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (selectedFiles.length + files.length > 5) {
      alert('최대 5개의 파일만 업로드할 수 있습니다.');
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleBuildingChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      buildingName: selectedOption.buildingName,
      buildingDong: selectedOption.buildingDong,
      floor: '',
    }));

    if (selectedOption.value === '힐스테이트 12BL') {
      setFloorOptions([
        { value: 'B1', label: 'B1층' },
        { value: '1', label: '1층' },
        { value: '2', label: '2층' },
        { value: '3', label: '3층' },
      ]);
    } else {
      setFloorOptions([
        { value: '1', label: '1층' },
        { value: '2', label: '2층' },
        { value: '3', label: '3층' },
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'homePagePath' || name === 'instaPath') {
      // URL이 http:// 또는 https://로 시작하는지 확인
      if (
        value &&
        !value.startsWith('http://') &&
        !value.startsWith('https://')
      ) {
        updatedValue = `https://${value}`;
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const generateBlockId = (buildingName, buildingDong, floor, storeAddress) => {
    let buildingCode = '0';
    if (buildingName === '힐스테이트') {
      buildingCode = buildingDong === 'A' ? '1' : '2';
    } else if (buildingName === '롯데캐슬') {
      buildingCode = '3';
    }

    let floorCode;
    switch (floor) {
      case 'B1':
        floorCode = '0';
        break;
      case '1':
        floorCode = '1';
        break;
      case '2':
        floorCode = '2';
        break;
      case '3':
        floorCode = '3';
        break;
      default:
        floorCode = '0';
    }

    const addressNumbers = storeAddress.replace(/\D/g, '');
    return `${buildingCode}${floorCode}${addressNumbers}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'storeName',
      'buildingName',
      'floor',
      'storeAddress',
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0 || selectedFiles.length === 0) {
      const missingFields = [
        ...emptyFields.map((field) => {
          switch (field) {
            case 'storeName':
              return '매장이름';
            case 'buildingName':
              return '매장위치';
            case 'floor':
              return '층';
            case 'storeAddress':
              return '상세 호실 주소';
            default:
              return field;
          }
        }),
        ...(selectedFiles.length === 0 ? ['매장 사진'] : []),
      ];
      setPopupMessage(`${missingFields.join(', ')}은(는) 필수 입력값입니다.`);
      setShowPopup(true);
      return;
    }

    const blockId = generateBlockId(
      formData.buildingName,
      formData.buildingDong,
      formData.floor,
      formData.storeAddress
    );

    const formDataToSend = new FormData();
    const jsonData = {
      instaPath: formData.instaPath,
      blockId: blockId,
      storeNumber: formData.storeNumber,
      floor: formData.floor,
      storeName: formData.storeName,
      info: formData.info,
      storeHours: storeHours,
      homePagePath: formData.homePagePath,
      storeAddress: formData.storeAddress,
      buildingDong: formData.buildingDong,
      buildingName: formData.buildingName,
    };

    formDataToSend.append('storeMemberForm', JSON.stringify(jsonData));

    selectedFiles.forEach((file, index) => {
      formDataToSend.append(`files`, file);
    });

    console.log('Sending formData:', JSON.stringify(jsonData));
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post('/api/stores', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1pc2FhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMzExMjk4MCwiZXhwIjoxNzIzMTE2NTgwfQ.KV7-2IswgZoUteYFrLHrMtxlw-WzkQnGtsLa1_oo9Bw`,
        },
      });
      console.log('Store registered successfully:', response.data);
      setPopupMessage('성공적으로 등록되었습니다');
      setShowPopup(true);
      setFormData({
        storeName: '',
        buildingName: '',
        buildingDong: '',
        floor: '',
        storeAddress: '',
        storeNumber: '',
        instaPath: '',
        homePagePath: '',
        info: '',
      });
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error registering store:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setPopupMessage('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      setShowPopup(true);
    }
  };

  useEffect(() => {
    setFloorOptions([
      { value: '1', label: '1층' },
      { value: '2', label: '2층' },
      { value: '3', label: '3층' },
    ]);
  }, []);

  return (
    <>
      <div className="enroll-container">
        <div className="enroll-header">
          <h2>매장등록</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="enroll-items">
            <div className="enroll-item">
              <h5 className="enroll-ask">
                매장이름 <span className="highlight-admin">*필수제출</span>
              </h5>
              <input
                className="enroll-input"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                placeholder="등록할 매장 이름을 정확히 입력해주세요"
              />
            </div>
            <div className="enroll-item">
              <h5 className="enroll-ask">
                매장위치 <span className="highlight-admin">*필수제출</span>
              </h5>
              <div className="enrollselect-container">
                <Select
                  className="enroll-select-option"
                  styles={customStyles}
                  options={buildingOptions}
                  placeholder="동 선택"
                  onChange={handleBuildingChange}
                />
                <Select
                  className="enroll-select-option-floor"
                  styles={customStylesFloor}
                  options={floorOptions}
                  placeholder="층 선택"
                  onChange={(selectedOption) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      floor: selectedOption.value,
                    }))
                  }
                  value={floorOptions.find(
                    (option) => option.value === formData.floor
                  )}
                />
              </div>
              <input
                className="enroll-input"
                name="storeAddress"
                value={formData.storeAddress}
                onChange={handleInputChange}
                placeholder="상세 호실 주소를 입력해주세요"
              />
            </div>
            <div className="enroll-item">
              <h5 className="enroll-ask">운영시간</h5>
              <div className="enroll-operationdata">
                <div
                  className={`operation-data ${
                    selectedOption === '모든 영업일이 같아요' ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionClick('모든 영업일이 같아요')}>
                  모든 영업일이 같아요
                </div>
                <div
                  className={`operation-data ${
                    selectedOption === '평일/주말 달라요' ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionClick('평일/주말 달라요')}>
                  평일/주말 달라요
                </div>
                <div
                  className={`operation-data ${
                    selectedOption === '요일별로 달라요' ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionClick('요일별로 달라요')}>
                  요일별로 달라요
                </div>
              </div>
            </div>
            <OperationModal
              option={selectedOption}
              setStoreHours={setStoreHours}
            />
            <div className="enroll-item">
              <h5 className="enroll-ask">매장 연락처</h5>
              <input
                className="enroll-input"
                name="storeNumber"
                value={formData.storeNumber}
                onChange={handleInputChange}
                placeholder="- 를 포함하여 입력하여주세요. ex>010-0000-0000"
              />
            </div>
            <div className="enroll-item">
              <h5 className="enroll-ask">매장 대표 홈페이지</h5>
              <input
                className="enroll-input"
                name="homePagePath"
                value={formData.homePagePath}
                onChange={handleInputChange}
                placeholder="등록할 매장 대표 홈페이지 링크를 입력해주세요"
              />
            </div>
            <div className="enroll-item">
              <h5 className="enroll-ask">인스타그램</h5>
              <input
                className="enroll-input"
                name="instaPath"
                value={formData.instaPath}
                onChange={handleInputChange}
                placeholder="등록할 매장 인스타그램 링크를 입력해주세요"
              />
            </div>
            <div className="enroll-item">
              <h5 className="enroll-ask">매장 상세설명</h5>
              <textarea
                className="enroll-input"
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                placeholder="등록할 매장 상세 설명을 정확히 입력해주세요"
              />
            </div>
            <div className="enroll-item">
              <h5 className="enroll-ask">
                매장 사진 업로드{' '}
                <span className="highlight-admin">*필수제출</span>
              </h5>
              <div className="file-upload-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/jpg,image/jpeg,image/png,image/gif"
                  multiple
                />
                <button
                  type="button"
                  className="upload-button"
                  onClick={handleUploadClick}>
                  파일 선택 ({selectedFiles.length}/5)
                </button>
                <div className="file-list">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}>
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button">
            확인
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}

export default EnrollStore;
