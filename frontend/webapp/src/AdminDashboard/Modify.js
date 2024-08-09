import React, { useState, useRef } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./AdminModify.css"; // CSS 파일 경로를 적절히 조정하세요

const API_KEY = process.env.REACT_APP_API_KEY;

function base64EncodeForAPI(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

export async function modifyStoreLoader({ params }) {
  const { name } = params;
  try {
    const encodedName = base64EncodeForAPI(name);
    // const response = await axios.get(`https://apig.misarodeo.com/api/stores/${encodedName}`, {
    const response = await axios.get(`/api/stores/${encodedName}`, {
      headers: {
        accept: "*/*",
        "x-api-key": API_KEY,
      },
    });
    console.log("Loader data:", response.data);
    return { storeData: response.data };
  } catch (error) {
    console.error("Error fetching store data:", error);
    return { storeData: null };
  }
}

function ModifyStore() {
  const { storeData } = useLoaderData() || {};
  const { name } = useParams();
  const navigate = useNavigate();

  console.log("Component received data:", storeData);

  const [storeName, setStoreName] = useState(storeData?.storeName || "");
  const [building, setBuilding] = useState({
    value: storeData?.buildingName || "",
    label: storeData?.buildingName || "",
  });
  const [floor, setFloor] = useState({
    value: storeData?.floorNumber || "",
    label: storeData?.floorNumber || "",
  });
  const [detailAddress, setDetailAddress] = useState(
    storeData?.detailAddress || ""
  );
  const [phone, setPhone] = useState(storeData?.phone || "");
  const [instagram, setInstagram] = useState(storeData?.instagram || "");
  const [website, setWebsite] = useState(storeData?.website || "");
  const [description, setDescription] = useState(storeData?.description || "");

  const [selectedOption, setSelectedOption] = useState("모든 영업일이 같아요");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  if (!storeData) {
    return <div>Loading... or Error occurred</div>;
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#f0f0ff",
      boxShadow: "none",
      borderRadius: "5px",
      height: "40px",
      minHeight: "40px",
      width: "20em",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#bdafff" : "white",
      color: "black",
    }),
  };

  const customStylesFloor = {
    ...customStyles,
    control: (provided) => ({
      ...provided,
      ...customStyles.control(provided),
      width: "10em",
      minHeight: "40px",
      height: "40px",
    }),
  };

  const buildingOptions = [
    { value: "힐스테이트 12BL", label: "힐스테이트 12BL" },
    { value: "힐스테이트 11BL", label: "힐스테이트 11BL" },
    { value: "롯데캐슬", label: "롯데캐슬" },
  ];

  const floorOptions = [
    { value: "B1층", label: "B1층" },
    { value: "1층", label: "1층" },
    { value: "2층", label: "2층" },
    { value: "3층", label: "3층" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (selectedFiles.length + files.length > 5) {
      alert("최대 5개의 파일만 업로드할 수 있습니다.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 제출 로직을 구현하세요
    console.log("Form submitted");
    // 예: API 호출 후 리다이렉트
    // await updateStore();
    // navigate('/admin/select');
  };

  return (
    <div className="modify-container">
      <div className="modify-header">
        <h2>매장수정</h2>
      </div>
      <form onSubmit={handleSubmit} className="modify-form">
        <div className="modify-item">
          <label className="modify-label">매장이름</label>
          <input
            className="modify-input"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="등록할 매장 이름을 정확히 입력해주세요"
          />
        </div>
        <div className="modify-item">
          <label className="modify-label">매장위치</label>
          <div className="select-container">
            <Select
              styles={customStyles}
              options={buildingOptions}
              value={building}
              onChange={setBuilding}
              placeholder="동 선택"
            />
            <Select
              styles={customStylesFloor}
              options={floorOptions}
              value={floor}
              onChange={setFloor}
              placeholder="층 선택"
            />
          </div>
          <input
            className="modify-input"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="상세 호실 주소를 입력해주세요"
          />
        </div>
        <div className="modify-item">
          <label className="modify-label">운영시간</label>
          <div className="operation-options">
            {[
              "모든 영업일이 같아요",
              "평일/주말 달라요",
              "요일별로 달라요",
            ].map((option) => (
              <button
                key={option}
                type="button"
                className={`operation-option ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {/* 여기에 Operation_edit 컴포넌트를 추가하세요 */}
        </div>
        <div className="modify-item">
          <label className="modify-label">매장 연락처</label>
          <input
            className="modify-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="등록할 매장 번호를 정확히 입력해주세요"
          />
        </div>
        <div className="modify-item">
          <label className="modify-label">매장 인스타그램 주소</label>
          <input
            className="modify-input"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="등록할 인스타그램 주소를 정확히 입력해주세요"
          />
        </div>
        <div className="modify-item">
          <label className="modify-label">매장 홈페이지 주소</label>
          <input
            className="modify-input"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="등록할 매장 홈페이지 주소를 정확히 입력해주세요"
          />
        </div>
        <div className="modify-item">
          <label className="modify-label">매장 상세설명</label>
          <textarea
            className="modify-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="등록할 매장 상세 설명을 정확히 입력해주세요"
          />
        </div>
        <div className="modify-item">
          <label className="modify-label">매장 사진 업로드</label>
          <div className="file-upload-container">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <button
              type="button"
              className="upload-button"
              onClick={handleUploadClick}
            >
              파일 선택 ({selectedFiles.length}/5)
            </button>
            <div className="file-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleRemoveFile(index)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">
          수정 완료
        </button>
      </form>
    </div>
  );
}

export default ModifyStore;
