import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SelectShop.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function base64EncodeForAPI(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}
const SelectShops = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBuildingBlock, setFilterBuildingBlock] = useState("");
  const [filterFloor, setFilterFloor] = useState("");
  const [token, setToken] = useState("");

  // 고정된 건물 및 블록 목록
  const allBuildingBlocks = ["힐스테이트 11BL", "힐스테이트 12BL", "롯데캐슬"];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        // 'https://apig.misarodeo.com/api/stores',
        "/api/stores",
        {
          headers: {
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204 || !response.data) {
        setError("No data available");
        setStores([]);
      } else {
        const parsedStores = response.data.flatMap((storeString) => {
          try {
            const storeData = JSON.parse(storeString);
            return storeData.data.map((store) => ({
              buildingBlock: getBuildingBlock(
                storeData.buildingName,
                storeData.buildingDong
              ),
              floor: storeData.floorNumber,
              storeName: store.storeName,
              storeNumber: store.storeNumber,
            }));
          } catch (err) {
            console.error("Error parsing store data:", err);
            return [];
          }
        });
        setStores(parsedStores);
        setFilteredStores(parsedStores);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      setError("Failed to fetch stores. Please try again later.");
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = stores.filter(
      (store) =>
        store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterBuildingBlock === "" ||
          store.buildingBlock === filterBuildingBlock) &&
        (filterFloor === "" || store.floor === filterFloor)
    );
    setFilteredStores(filtered);
  }, [stores, searchTerm, filterBuildingBlock, filterFloor]);

  const getBuildingBlock = (buildingName, buildingDong) => {
    if (buildingName === "힐스테이트" && buildingDong === "A")
      return "힐스테이트 11BL";
    if (buildingName === "힐스테이트" && buildingDong === "B")
      return "힐스테이트 12BL";
    if (buildingName === "롯데캐슬") return "롯데캐슬";
    return `${buildingName} ${buildingDong}`; // 기타 경우
  };

  const handleDelete = async (store) => {
    const isConfirmed = window.confirm(
      `"${store.storeName}"을(를) 정말로 삭제하시겠습니까?`
    );

    if (isConfirmed) {
      try {
        await axios.delete(`/api/stores/${store.storeName}`, {
          headers: {
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        // 성공적으로 삭제된 경우, 로컬 상태 업데이트
        setStores(stores.filter((s) => s.storeName !== store.storeName));
        setFilteredStores(
          filteredStores.filter((s) => s.storeName !== store.storeName)
        );
        alert("상점이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting store:", error);
        alert("상점 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const displayFloor = (floor) => {
    return floor === "0" ? "B1" : floor;
  };

  const uniqueFloors = [...new Set(stores.map((store) => store.floor))].sort(
    (a, b) => a - b
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="enroll-container">
      <div className="enroll-header">
        <h2>매장조회</h2>
      </div>
      <div className="select-items">
        <div className="border-adminstore mb-4">
          <input
            type="text"
            placeholder="매장을 검색해주세요"
            className="search-adminstore w-full p-2 border rounded mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex-adminstore space-x-4">
            <select
              className="build-adminstore p-2 border rounded"
              value={filterBuildingBlock}
              onChange={(e) => setFilterBuildingBlock(e.target.value)}
            >
              <option value="">모든 건물</option>
              {allBuildingBlocks.map((buildingBlock) => (
                <option key={buildingBlock} value={buildingBlock}>
                  {buildingBlock}
                </option>
              ))}
            </select>
            <select
              className="build-adminstore p-2 border rounded"
              value={filterFloor}
              onChange={(e) => setFilterFloor(e.target.value)}
            >
              <option value="">모든 층</option>
              {uniqueFloors.map((floor) => (
                <option key={floor} value={floor}>
                  {displayFloor(floor)}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filteredStores.length > 0 ? (
          <table className="border-adminstore w-full border-collapse border">
            <thead>
              <tr className="selectadmin-trheader">
                <th className="border p-2">건물</th>
                <th className="border p-2">층</th>
                <th className="border p-2">상점명</th>
                <th className="border p-2">전화번호</th>
                <th className="border p-2">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((store, index) => (
                <tr key={index}>
                  <td className="border p-2">{store.buildingBlock}</td>
                  <td className="border p-2">{displayFloor(store.floor)}</td>
                  <td className="border p-2">{store.storeName}</td>
                  <td className="border p-2">{store.storeNumber}</td>
                  <td className="border p-2">
                    <Link
                      to={`/admin/modify/${base64EncodeForAPI(
                        store.storeName
                      )}`}
                      className="admin-button modi-btn bg-red-500 text-white px-2 py-1 rounded"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handleDelete(store)}
                      className="admin-button del-btn bg-red-500 text-white px-2 py-1 rounded"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No stores available</p>
        )}
      </div>
    </div>
  );
};

export default SelectShops;
