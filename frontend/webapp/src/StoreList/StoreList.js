import React, { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "../Fix/MainHeader";
import MainFooter from "../Fix/MainFooter";
import ListSearchBar from "./ListSearchBar";
import SearchLine from "./SearchLine";
import ListStore from "./ListResult";

const API_KEY = process.env.REACT_APP_API_KEY;

function StoreList() {
  const [allStores, setAllStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await axios.get("https://apig.misarodeo.com/api/menu", {
      const response = await axios.get("/api/menu", {
        headers: {
          accept: "*/*",
          "x-api-key": API_KEY,
        },
      });
      console.log("API Response:", response.data);

      if (!Array.isArray(response.data)) {
        throw new Error("API 응답이 배열 형태가 아닙니다.");
      }

      const parsedData = response.data.map((item) => JSON.parse(item));
      console.log("Parsed data:", parsedData);

      const processedData = parsedData.flatMap((floor) => {
        if (!floor.data || !Array.isArray(floor.data)) {
          console.warn("Invalid floor data:", floor);
          return [];
        }
        return floor.data.map((store) => ({
          ...store,
          buildingName: floor.buildingName,
          buildingDong: floor.buildingDong,
          floorNumber: floor.floorNumber,
        }));
      });

      console.log("Processed data:", processedData);

      setAllStores(processedData);
      setFilteredStores(processedData);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setError(`매장 정보를 불러오는 데 실패했습니다: ${error.message}`);
      setAllStores([]);
      setFilteredStores([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRetry = () => {
    fetchStores();
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleRetry}>다시 시도</button>
      </div>
    );
  }

  return (
    <>
      <MainHeader />
      <ListSearchBar
        setFilteredStores={setFilteredStores}
        allStores={allStores}
      />
      <SearchLine count={filteredStores.length} />
      <ListStore stores={filteredStores} />
      <MainFooter />
    </>
  );
}

export default StoreList;
