import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("1F");
  const [floorData, setFloorData] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        selectedFloor,
        setSelectedFloor,
        floorData,
        setFloorData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
