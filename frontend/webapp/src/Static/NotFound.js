import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import FONTMISA from "../asset/logo/FONTMISA.png";
import "./NotFound.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>MisaRodeo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div className="page-container">
        <div className="content">
          <div className="HeadImage">
            <img src={FONTMISA} alt="상단 이미지" className="w-full" />
          </div>
          <div className="word">
            <h1 className="text-center text-2xl my-4">
              존재하지 않는 페이지입니다.
            </h1>
          </div>
          <div className="button-container">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                returnHome();
              }}
              data-text="홈으로 돌아가기"
            >
              홈으로 돌아가기
            </a>
          </div>
        </div>
        <div className="bottom-color"></div>
      </div>
    </>
  );
};

export default NotFoundPage;
