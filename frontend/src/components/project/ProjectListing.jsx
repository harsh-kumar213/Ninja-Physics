import React from "react";
import GameLevels from "./GameLevels";

function App() {
  const levels = Array.from({ length: 20 }, (_, i) => i + 1); // Levels 1 to 20
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <GameLevels levels={levels} levelsPerRow={5} />
    </div>
  );
}

export default App;
