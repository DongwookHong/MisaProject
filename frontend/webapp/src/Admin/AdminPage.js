import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import AdminShopList from "./AdminShopList";
import AdminAddShop from "../AdminDashboard/AdminAddShop";
import AdminFixShop from "./AdminUpdateShop";
import LoginPage from "./LoginPage";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      fetchStores();
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("/admin/login", { username, password });
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        setIsLoggedIn(true);
        fetchStores();
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("로그인에 실패했습니다.");
    }
  };

  const fetchStores = async () => {
    try {
      //https://api.misarodeo.com/
      // const response = await axios.get("https://api.misarodeo.com/api/store", {
      const response = await axios.get("/api/store", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setStores(response.data);
    } catch (error) {
      console.error("Failed to fetch stores", error);
      setError("상점 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleAddStore = async (newStore) => {
    try {
      await axios.post("/api/store", newStore, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchStores();
    } catch (error) {
      console.error("Failed to add store", error);
      setError("상점 추가에 실패했습니다.");
    }
  };

  const handleUpdateStore = async (updatedStore) => {
    try {
      await axios.put(`/api/store/${updatedStore.id}`, updatedStore, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setEditingStore(null);
      fetchStores();
    } catch (error) {
      console.error("Failed to update store", error);
      setError("상점 수정에 실패했습니다.");
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      await axios.delete(`/api/store/${storeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchStores();
    } catch (error) {
      console.error("Failed to delete store", error);
      setError("상점 삭제에 실패했습니다.");
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="admin-page">
      <h1>관리자 페이지</h1>
      {error && <p className="admin-error">{error}</p>}
      <AdminShopList
        stores={stores}
        onEdit={setEditingStore}
        onDelete={handleDeleteStore}
      />
      {editingStore ? (
        <AdminFixShop
          shop={editingStore}
          onUpdate={handleUpdateStore}
          onCancel={() => setEditingStore(null)}
        />
      ) : (
        <AdminAddShop onAdd={handleAddStore} />
      )}
    </div>
  );
};

export default AdminPage;
