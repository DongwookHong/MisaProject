import React from 'react';
import { Link } from 'react-router-dom';
import '../style/MainMenu/Card.css';
const Card = ({ post, pos, onClick }) => {
  return (
    <Link to="/floor0">
    <div
      className={`card ${pos < 0 && pos !== 0 ? "card--gone" : ""} ${
        pos > 0 && pos !== 0 ? "card--coming" : ""
      }`}
      data-pos={pos}
      onClick={onClick} // 클릭 이벤트 핸들러 추가
    >
      <div className="card__content-mark">
        <article className="card__content">
          <h1 className="card__title">
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </h1>
        </article>
      </div>
    </div>
    </Link>
  );
};

export default Card;