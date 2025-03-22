import React, { useState, useEffect } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const RangeSlider = ({ min, max, start, onChange }) => {
  const [values, setValues] = useState(start);


  useEffect(()=>{
    onChange(values)
  },[values])
 
  return (
    <div className="p-3">
      <Nouislider
        range={{ min, max }}
        start={start}
        connect
        step={100}
        onSlide={(updatedValues) => setValues(updatedValues.map(Number))}
      />
      <div className="flex justify-between text-sm pt-4 text-pink-500">
        <span>₹{values[0]}</span>
        <span>₹{values[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
