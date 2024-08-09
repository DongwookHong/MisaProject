import React, { useState, useRef, useEffect } from "react";
import "./EnrollStore.css";
import Select from "react-select";
import Operation_edit from "./Operation_Edit.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./renderTime.css";

function ModifyStore() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storeHours, setStoreHours] = useState([]);
  const [showEditOptions, setShowEditOptions] = useState(false);

  const [storeName, setStoreName] = useState("");
  const [building, setBuilding] = useState(null);
  const [floor, setFloor] = useState(null);
  const [blockId, setBlockId] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [instaPath, setInstaPath] = useState("");
  const [homePagePath, setHomePagePath] = useState("");
  const [storeInfo, setStoreInfo] = useState("");
  const [storeImages, setStoreImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [storeAddress, setStoreAddress] = useState("");
  const fileInputRef = useRef(null);

  function base64EncodeForAPI(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode("0x" + p1);
      })
    );
  }

  const generateBlockId = (buildingName, buildingDong, floor, storeAddress) => {
    let buildingCode = "0";
    if (buildingName === "힐스테이트") {
      buildingCode = buildingDong === "A" ? "1" : "2";
    } else if (buildingName === "롯데캐슬") {
      buildingCode = "3";
    }

    let floorCode;
    switch (floor) {
      case "B1":
        floorCode = "0";
        break;
      case "1":
        floorCode = "1";
        break;
      case "2":
        floorCode = "2";
        break;
      case "3":
        floorCode = "3";
        break;
      default:
        floorCode = "0";
    }

    const addressNumbers = storeAddress.replace(/\D/g, "");
    return `${buildingCode}${floorCode}${addressNumbers}`;
  };

  const fetchStoreData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const encodedName = base64EncodeForAPI(name);

      const response = await axios.get(
        `https://apig.misarodeo.com/api/stores/${decodedName}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log(response.data);
      if (
        !data.storeName ||
        !data.buildingName ||
        !data.floorNumber ||
        !data.blockId
      ) {
        throw new Error("필수 필드가 누락되었습니다.");
      }

      // Set required fields
      setStoreName(data.storeName);
      setBuilding({ value: data.buildingName, label: data.buildingName });
      setFloor({
        value: data.floorNumber,
        label: `${data.floorNumber}층`,
      });
      setBlockId(data.blockId);
      setStoreAddress(data.storeAddress || "");

      // Set optional fields with default values
      setStoreHours(data.storeHours || []);
      setStorePhone(data.storePhone || "");
      setStoreImages(data.storeImages || []);
      setInstaPath(data.instaPath || "");
      setHomePagePath(data.homePagePath || "");
      setStoreInfo(data.storeInfo || "");

      console.log("Received store data:", data);
    } catch (error) {
      console.error("Error fetching store data:", error);
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
    { value: "힐스테이트 12BL", label: "힐스테이트 12BL", dong: "A" },
    { value: "힐스테이트 11BL", label: "힐스테이트 11BL", dong: "B" },
    { value: "롯데캐슬", label: "롯데캐슬", dong: "C" },
  ];

  const floorOptions = [
    { value: "B1", label: "B1층" },
    { value: "1", label: "1층" },
    { value: "2", label: "2층" },
    { value: "3", label: "3층" },
  ];

  const [selectedOption, setSelectedOption] = useState("모든 영업일이 같아요");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif"
    );

    if (selectedFiles.length + newFiles.length > 5) {
      alert("최대 5개의 파일만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let buildingName, buildingDong;
      if (
        building.value === "힐스테이트 12BL" ||
        building.value === "힐스테이트 11BL"
      ) {
        buildingName = "힐스테이트";
        buildingDong = building.value === "힐스테이트 12BL" ? "A" : "B";
      } else {
        buildingName = "롯데캐슬";
        buildingDong = "C";
      }

      const floorNumber = parseInt(floor.value, 10);

      const generatedBlockId = generateBlockId(
        buildingName,
        buildingDong,
        floor.value,
        storeAddress
      );

      const updatedData = {
        storeName,
        buildingName,
        buildingDong,
        floor: floorNumber,
        blockId: generatedBlockId,
        storePhone,
        instaPath,
        homePagePath,
        storeInfo,
        storeHours,
        storeAddress,
      };

      console.log(
        "Sending data to server:",
        JSON.stringify(updatedData, null, 2)
      );

      const formDataToSend = new FormData();
      formDataToSend.append("storeMemberForm", JSON.stringify(updatedData));

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          formDataToSend.append(`files`, file);
        });
      } else {
        formDataToSend.append("files", new File([], "empty.txt"));
      }

      const encodedName = base64EncodeForAPI(name);

      const response = await axios.put(
        `https://apig.misarodeo.com/api/stores/${decodedName}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("매장 정보가 성공적으로 수정되었습니다.");
      } else {
        throw new Error("Failed to update store information");
      }
    } catch (error) {
      console.error("Error updating store data:", error);
      setError(`매장 정보 수정에 실패했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleImageChange = async () => {
    try {
      await axios.put(
        `https://apig.misarodeo.com//api/stores/${decodedName}/images`,
        { storeImages },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      alert("이미지가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating store images:", error);
      alert("이미지 업데이트에 실패했습니다.");
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
              매장위치 <span className="highlight-admin">*필수제출</span>{" "}
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
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
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
                      selectedOption === "모든 영업일이 같아요"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleOptionClick("모든 영업일이 같아요")}
                  >
                    모든 영업일이 같아요
                  </div>
                  <div
                    className={`operation-data ${
                      selectedOption === "평일/주말 달라요" ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick("평일/주말 달라요")}
                  >
                    평일/주말 달라요
                  </div>
                  <div
                    className={`operation-data ${
                      selectedOption === "요일별로 달라요" ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick("요일별로 달라요")}
                  >
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
              매장 사진 업로드{" "}
              <span className="highlight-admin">*필수제출</span>
            </h5>
            <div className="file-upload-container">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/jpg,image/jpeg,image/png,image/gif"
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
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="last-submit-button" onClick={handleSubmit}>
        최종수정하기
      </button>
      {isLoading && <div>수정 중...</div>}
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default ModifyStore;



