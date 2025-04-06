import React from "react";

const CanvasArea = ({ canvasRef }) => {
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="border-2 border-gray-300 shadow-lg bg-white">
        <canvas id="captureArea" ref={canvasRef} ></canvas>
      </div>
    </div>
  );
};

export default CanvasArea;