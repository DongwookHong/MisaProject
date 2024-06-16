import React, { useState } from "react";
import "../style/MainMenu/CardMenu.css";
import Card from "./Card";

const cardData = [
  { title: "HillState A동" },
  { title: "HillState B동" },
  { title: "Lottecastle" },
];

const generatePosts = (data) => {
  return data.map((item, i) => ({
    title: item.title,
  }));
};

const POSTS = generatePosts(cardData);

const CardMenu = () => {
  const [active, setActive] = useState(1);
  const amount = POSTS.length;
  const magicNumber = 1; // Adjusted for a smaller number of cards

  const getPos = (i) => {
    let pos = i - active;
    if (amount <= 3) {
      return pos;
    }
    if (active >= amount - magicNumber && i <= magicNumber) {
      pos = i + (amount - active);
    } else if (active <= magicNumber && i >= amount - magicNumber) {
      pos = 0 - (amount - i + active);
    }
    return pos;
  };

  const handleClick = (index) => {
    setActive(index);
  };

  const handleCardClick = (index) => {
    if (index === 0) {
      setActive(active - 1 < 0 ? amount - 1 : active - 1);
    } else if (index === amount - 1) {
      setActive(active + 1 > amount - 1 ? 0 : active + 1);
    } else {
      setActive(index);
    }
  };

  return (
    <div className="card-menu main-container">
      <ul className="card-track">
        {POSTS.map((post, i) => (
          <Card
            key={i}
            post={post}
            pos={getPos(i)}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardMenu;