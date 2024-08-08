import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../asset/logo/misalogo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        const responseText = await response.text();
        console.log("Response text:", responseText);

        if (response.ok) {
          if (responseText.startsWith("ey")) {
            console.log("Login successful. Token received.");
            localStorage.setItem("token", responseText);
            navigate("/addshop"); // 로그인 성공 시 매장 등록 페이지로 이동
          } else {
            try {
              const data = JSON.parse(responseText);
              if (data.token) {
                console.log("Login successful. Token:", data.token);
                localStorage.setItem("token", data.token);
                navigate("/addshop"); // 로그인 성공 시 매장 등록 페이지로 이동
              } else {
                console.error("Login failed: No token in response");
                setError("로그인 실패: 토큰이 없습니다.");
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
              setError("서버 응답을 처리하는 데 문제가 발생했습니다.");
            }
          }
        } else {
          console.error("Login failed:", responseText);
          setError(
            `로그인 실패: ${responseText || "알 수 없는 오류가 발생했습니다."}`
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else {
      setError("아이디와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
