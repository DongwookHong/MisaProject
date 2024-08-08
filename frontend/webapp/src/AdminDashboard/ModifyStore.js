import React, { useState, useRef, useEffect } from 'react';
import './EnrollStore.css';
import Select from 'react-select';
import Operation_edit from './Operation_Edit.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

function ModifyStore() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  console.log('the code name is ', decodedName);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [storeName, setStoreName] = useState('');
  const [building, setBuilding] = useState(null);
  const [floor, setFloor] = useState(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  const fetchStoreData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/stores/${decodedName}`, {
        headers: {
          accept: '*/*',
          'x-api-key': API_KEY,
        },
      });
      setStoreData(response.data);
      // Populate the state with fetched data
      setStoreName(response.data.name);

      setBuilding({
        value: response.data.buildingName,
        label: response.data.buildingName,
      });
      setFloor({
        value: response.data.floorNumber,
        label: response.data.floorNumber,
      });
      setDetailAddress(response.data.detailAddress);
      setPhone(response.data.phone);
      console.log('phone num: ', response.data.phone);
      setInstagram(response.data.instagram);
      setWebsite(response.data.website);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching store data:', error);
      setError(`매장 정보를 불러오는 데 실패했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [decodedName]);

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

  const [selectedOption, setSelectedOption] = useState('모든 영업일이 같아요');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

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
  return (
    <>
      <div className="enroll-container">
        <div className="enroll-header">
          <h2>매장수정</h2>
        </div>
        <div className="enroll-items">
          <div className="enroll-item">
            <h5 className="enroll-ask">매장이름</h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 이름을 정확히 입력해주세요"></input>
            <button className="submit-button">수정</button>
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
            <button className="submit-button">수정</button>
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
          <div>
            <Operation_edit option={selectedOption} />
            <button className="submit-button">수정</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 연락처</h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 번호를 정확히 입력해주세요"></input>
            <button className="submit-button">수정</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 인스타그램 주소</h5>
            <input
              className="enroll-input"
              placeholder="등록할 인스타그램 주소를 정확히 입력해주세요"></input>
            <button className="submit-button">수정</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 홈페이지 주소</h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 홈페이지 주소를 정확히 입력해주세요"></input>
            <button className="submit-button">수정</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 상세설명</h5>
            <textarea
              className="enroll-input"
              placeholder="등록할 매장 상세 설명을 정확히 입력해주세요"
            />
            <button className="submit-button">수정</button>
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 사진 업로드</h5>
            <div className="file-upload-container">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
              <button className="upload-button" onClick={handleUploadClick}>
                파일 선택 ({selectedFiles.length}/5)
              </button>
              <div className="file-list">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <button onClick={() => handleRemoveFile(index)}>
                      삭제
                    </button>
                  </div>
                ))}
                {/* </div> */}
                <button className="submit-button">제출하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModifyStore;
