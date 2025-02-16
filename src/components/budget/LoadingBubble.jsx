

function LoadingBubble() {
  return (
    <div className="flex items-center gap-3">
      {/* Spinning F1 tire with a thick look */}
      <div
        className="relative w-[50px] h-[50px] rounded-full 
        border-[10px] border-gray-900 border-solid 
        border-t-red-500 border-r-white border-b-black border-l-gray-500 
        animate-spin-fast"
      >
        {/* Inner Rim Effect */}
        <div
          className="absolute inset-2 w-[60%] h-[60%] rounded-full bg-gray-800"
        ></div>
      </div>
      {/* Text animation: "Speeding up..." */}
      <p className="text-sm text-gray-800 font-semibold animate-pulse">
        Finding perfect vendors for you....
      </p>
    </div>
  );
}

export default LoadingBubble;