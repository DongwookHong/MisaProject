import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const UpdateShops = () => {
  const { name } = useParams();
  const [store, setStore] = useState({
    buildingName: "",
    buildingDong: "",
    floor: "",
    blockId: "",
    storeName: "",
    storeHours: [
      {
        dayOfWeek: "",
        isOpen: true,
        openTime: "",
        closeTime: "",
        breakStartTime: "",
        breakEndTime: "",
        lastOrder: "",
      },
    ],
    businessHour: "",
    info: "",
    storeNumber: "",
    homePagePath: "",
    instaPath: "",
    storeAddress: "",
    files: [],
  });
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          // `https://api.misarodeo.com/api/stores/${name}`,
          `/api/stores/${name}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );
        setStore(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
        setError("Failed to fetch store data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleStoreHoursChange = (index, field, value) => {
    const newStoreHours = [...store.storeHours];
    newStoreHours[index] = { ...newStoreHours[index], [field]: value };
    setStore({ ...store, storeHours: newStoreHours });
  };

  const handleFileChange = (e) => {
    setNewFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all store data to formData
    Object.keys(store).forEach((key) => {
      if (key === "storeHours") {
        formData.append(key, JSON.stringify(store[key]));
      } else if (key !== "files") {
        formData.append(key, store[key]);
      }
    });

    // Append new files
    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.put(`/api/stores/${name}`, formData, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Store updated successfully!");
    } catch (error) {
      console.error("Error updating store:", error);
      setError("Failed to update store. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Update Store: {store.storeName}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Building Name:</label>
          <input
            type="text"
            name="buildingName"
            value={store.buildingName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Building Dong:</label>
          <input
            type="text"
            name="buildingDong"
            value={store.buildingDong}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Floor:</label>
          <input
            type="text"
            name="floor"
            value={store.floor}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Block ID:</label>
          <input
            type="text"
            name="blockId"
            value={store.blockId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Store Name:</label>
          <input
            type="text"
            name="storeName"
            value={store.storeName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Store Hours:</label>
          {store.storeHours.map((hours, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={hours.dayOfWeek}
                onChange={(e) =>
                  handleStoreHoursChange(index, "dayOfWeek", e.target.value)
                }
                className="w-full p-2 border rounded"
                placeholder="Day of Week"
              />
              <input
                type="text"
                value={hours.openTime}
                onChange={(e) =>
                  handleStoreHoursChange(index, "openTime", e.target.value)
                }
                className="w-full p-2 border rounded"
                placeholder="Open Time"
              />
              <input
                type="text"
                value={hours.closeTime}
                onChange={(e) =>
                  handleStoreHoursChange(index, "closeTime", e.target.value)
                }
                className="w-full p-2 border rounded"
                placeholder="Close Time"
              />
              {/* Add more inputs for other store hours fields */}
            </div>
          ))}
        </div>
        <div>
          <label className="block">Business Hour:</label>
          <input
            type="text"
            name="businessHour"
            value={store.businessHour}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Info:</label>
          <textarea
            name="info"
            value={store.info}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Store Number:</label>
          <input
            type="text"
            name="storeNumber"
            value={store.storeNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Homepage Path:</label>
          <input
            type="text"
            name="homePagePath"
            value={store.homePagePath}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Instagram Path:</label>
          <input
            type="text"
            name="instaPath"
            value={store.instaPath}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Store Address:</label>
          <input
            type="text"
            name="storeAddress"
            value={store.storeAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Files:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Store
        </button>
      </form>
    </div>
  );
};

export default UpdateShops;
