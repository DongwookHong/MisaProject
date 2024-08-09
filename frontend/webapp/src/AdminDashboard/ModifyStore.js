import React, { useState, useRef, useEffect } from 'react';
import './EnrollStore.css';
import Select from 'react-select';
import Operation_edit from './Operation_Edit.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './renderTime.css';

function ModifyStore() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storeHours, setStoreHours] = useState([]);
  const [showEditOptions, setShowEditOptions] = useState(false);

  const [storeName, setStoreName] = useState('');
  const [building, setBuilding] = useState(null);
  const [floor, setFloor] = useState(null);
  const [blockId, setBlockId] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [instaPath, setInstaPath] = useState('');
  const [homePagePath, setHomePagePath] = useState('');
  const [storeInfo, setStoreInfo] = useState('');
  const [storeImages, setStoreImages] = useState([]);
  const fileInputRef = useRef(null);

  function base64EncodeForAPI(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
      })
    );
  }
  const token = sessionStorage.getItem('token');
  const fetchStoreData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // const response = await axios.get(
      // `https://apig.misarodeo.com/api/stores/${decodedName}`,
      // {
      const response = await axios.get(`/api/stores/${decodedName}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      setStoreName(data.storeName);
      setBuilding({ value: data.buildingName, label: data.buildingName });
      setFloor({ value: data.floorNumber, label: data.floorNumber });
      // setBlockId(data.blockId); //확인해봐야함!
      setBlockId(data.blockId.slice(2));
      setStoreHours(data.storeHours);
      setStorePhone(data.storePhone);
      console.log('store Phone: ', storePhone);
      setStoreImages(data.storeImages);

      setInstaPath(data.instaPath);
      setHomePagePath(data.homePagePath);
      console.log('detailAddress:', data.blockId);
      setStoreInfo(data.storeInfo);
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

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setStoreImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    if (window.confirm('정말로 이 이미지를 삭제하시겠습니까?')) {
      setStoreImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = async () => {
    try {
      await axios.put(
        `/api/stores/${decodedName}/images`,
        { storeImages },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      alert('이미지가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('Error updating store images:', error);
      alert('이미지 업데이트에 실패했습니다.');
    }
  };

  const handleEditStoreHours = () => {
    setShowEditOptions(true);
  };

  const renderStoreHours = () => {
    if (storeHours.length === 0) return null;

    const allSame = storeHours.every(
      (day) =>
        day.openTime === storeHours[0].openTime &&
        day.closeTime === storeHours[0].closeTime &&
        day.breakStartTime === storeHours[0].breakStartTime &&
        day.breakEndTime === storeHours[0].breakEndTime
    );

    if (allSame) {
      const { openTime, closeTime, breakStartTime, breakEndTime } =
        storeHours[0];
      return (
        <div className="store-hours">
          <div className="hours-item">
            <span className="hours-label">매일:</span>
            <span className="hours-time">
              {openTime} - {closeTime}
            </span>
          </div>
          <div className="hours-item">
            <span className="hours-label">브레이크 타임:</span>
            <span className="hours-time">
              {breakStartTime} - {breakEndTime}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="store-hours">
          {storeHours.map((day) => (
            <div key={day.dayOfWeek} className="hours-item">
              <span className="hours-label">{day.dayOfWeek}:</span>
              <span className="hours-time">
                {day.openTime} - {day.closeTime}
              </span>
              <div className="break-time">
                <span className="hours-label">브레이크 타임:</span>
                <span className="hours-time">
                  {day.breakStartTime} - {day.breakEndTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="enroll-container">
        <div className="enroll-header">
          <h2>매장수정</h2>
        </div>
        <div className="enroll-items">
          <div className="enroll-item">
            <h5 className="enroll-ask">
              매장이름 <span className="highlight-admin">*필수제출</span>
            </h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 이름을 정확히 입력해주세요"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">
              매장위치 <span className="highlight-admin">*필수제출</span>{' '}
            </h5>
            <div className="enrollselect-container">
              <Select
                className="enroll-select-option"
                styles={customStyles}
                options={buildingOptions}
                placeholder="동 선택"
                value={building}
                onChange={setBuilding}
              />
              <Select
                className="enroll-select-option-floor"
                styles={customStylesFloor}
                options={floorOptions}
                placeholder="층 선택"
                value={floor}
                onChange={setFloor}
              />
            </div>

            <input
              className="enroll-input"
              placeholder="상세 호실 주소를 입력해주세요"
              value={blockId}
              onChange={(e) => setBlockId(e.target.value)}
            />
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">운영시간</h5>
            {renderStoreHours()}
            <button className="submit-button" onClick={handleEditStoreHours}>
              영업시간 수정하기
            </button>
            {showEditOptions && (
              <div className="enroll-item">
                <div className="enroll-operationdata-modi">
                  <div
                    className={`operation-data ${
                      selectedOption === '모든 영업일이 같아요'
                        ? 'selected'
                        : ''
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
                  {showEditOptions && (
                    <div>
                      <Operation_edit option={selectedOption} />
                      <button className="submit-button">수정 제출하기</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="enroll-item">
            <h5 className="enroll-ask">매장 연락처</h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 번호를 정확히 입력해주세요"
              value={storePhone}
              onChange={(e) => setStorePhone(e.target.value)}
            />
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 인스타그램 주소</h5>
            <input
              className="enroll-input"
              placeholder="등록할 인스타그램 주소를 정확히 입력해주세요"
              value={instaPath}
              onChange={(e) => setInstaPath(e.target.value)}
            />
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 홈페이지 주소</h5>
            <input
              className="enroll-input"
              placeholder="등록할 매장 홈페이지 주소를 정확히 입력해주세요"
              value={homePagePath}
              onChange={(e) => setHomePagePath(e.target.value)}
            />
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">매장 상세설명</h5>
            <textarea
              className="enroll-input"
              placeholder="등록할 매장 상세 설명을 정확히 입력해주세요"
              value={storeInfo}
              onChange={(e) => setStoreInfo(e.target.value)}
            />
          </div>
          <div className="enroll-item">
            <h5 className="enroll-ask">
              매장 사진 업로드{' '}
              <span className="highlight-admin">*필수제출</span>
            </h5>

            <div className="admin-images">
              {storeImages.map((image, index) => (
                <div key={index} className="admin-each-image">
                  <img
                    src={image}
                    alt={`Store ${index + 1}`}
                    className="admin-store-images"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="remove-image">
                    삭제
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
            />
          </div>
        </div>
        <div className="admin-edit-photo-btn">
          <button
            onClick={() => fileInputRef.current.click()}
            className="upload-button">
            사진 추가 ({storeImages.length}/5)
          </button>
        </div>
      </div>
      <button className="last-submit-button">최종수정하기</button>
    </>
  );
}

export default ModifyStore;
