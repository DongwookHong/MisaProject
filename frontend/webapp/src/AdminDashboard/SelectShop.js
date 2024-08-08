import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SelectShop.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const SelectShops = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuildingBlock, setFilterBuildingBlock] = useState('');
  const [filterFloor, setFilterFloor] = useState('');

  // 고정된 건물 및 블록 목록
  const allBuildingBlocks = ['힐스테이트 11BL', '힐스테이트 12BL', '롯데캐슬'];

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          '/api/stores',
          // "https://api.misarodeo.com/api/stores",
          {
            headers: {
              'x-api-key': API_KEY,
            },
          }
        );

        if (response.status === 204 || !response.data) {
          setError('No data available');
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
              console.error('Error parsing store data:', err);
              return [];
            }
          });
          setStores(parsedStores);
          setFilteredStores(parsedStores);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
        setError('Failed to fetch stores. Please try again later.');
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const filtered = stores.filter(
      (store) =>
        store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterBuildingBlock === '' ||
          store.buildingBlock === filterBuildingBlock) &&
        (filterFloor === '' || store.floor === filterFloor)
    );
    setFilteredStores(filtered);
  }, [stores, searchTerm, filterBuildingBlock, filterFloor]);

  const getBuildingBlock = (buildingName, buildingDong) => {
    if (buildingName === '힐스테이트' && buildingDong === 'A')
      return '힐스테이트 11BL';
    if (buildingName === '힐스테이트' && buildingDong === 'B')
      return '힐스테이트 12BL';
    if (buildingName === '롯데캐슬') return '롯데캐슬';
    return `${buildingName} ${buildingDong}`; // 기타 경우
  };

  const handleDelete = async (store) => {
    const isConfirmed = window.confirm(
      `"${store.storeName}"을(를) 정말로 삭제하시겠습니까?`
    );

    if (isConfirmed) {
      try {
        // 여기에 실제 삭제 API 호출 로직을 추가할 수 있습니다.
        // 예: await axios.delete(`/api/stores/${store.storeNumber}`, { headers: { 'x-api-key': API_KEY } });

        setStores(stores.filter((s) => s.storeNumber !== store.storeNumber));
      } catch (error) {
        console.error('Error deleting store:', error);
        alert('상점 삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const displayFloor = (floor) => {
    return floor === '0' ? 'B1' : floor;
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
              onChange={(e) => setFilterBuildingBlock(e.target.value)}>
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
              onChange={(e) => setFilterFloor(e.target.value)}>
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
                    {/* <Link
                      to={`/stores/update/${store.storeName}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                      수정
                    </Link> */}

                    <Link
                      to={`/admin/modify/${encodeURIComponent(
                        store.storeName
                      )}`}
                      className="admin-button modi-btn bg-red-500 text-white px-2 py-1 rounded">
                      수정
                    </Link>
                    <button
                      onClick={() => handleDelete(store)}
                      className="admin-button del-btn bg-red-500 text-white px-2 py-1 rounded">
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
