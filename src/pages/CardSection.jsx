
import React from 'react'
export default function CardSection({ cards }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div key={index} className={index % 2 === 0 ? "upper w-full" : "lower w-full"}>
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}

