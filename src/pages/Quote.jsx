import React, { useState, useEffect } from 'react';

const Quote = () => {
    const quotes = [
        {
            text: "A successful marriage requires falling in love many times, always with the same person.",
            author: "Mignon McLaughlin"
        },
        {
            text: "The greatest thing you'll ever learn is just to love and be loved in return.",
            author: "Nat King Cole"
        },
        {
            text: "A happy marriage is a long conversation which always seems too short.",
            author: "André Maurois"
        },
        {
            text: "True love stories never have endings.",
            author: "Richard Bach"
        },
        {
            text: "Grow old with me, the best is yet to be.",
            author: "Robert Browning"
        }
    ];

    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-gradient-to-r from-pink-50 to-rose-50 py-4 border-t border-b border-pink-100">
            <div className="container mx-auto px-4">
                <div className="relative h-[60px] overflow-hidden">
                    {quotes.map((quote, index) => (
                        <div
                            key={index}
                            className={`absolute w-full transition-all duration-1000 ease-in-out text-center
                                ${index === currentQuote 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-full opacity-0'}`}
                        >
                            <p className="font-montserrat text-gray-700 italic">
                                "{quote.text}" 
                                <span className="text-pink-500 not-italic ml-2">
                                    – {quote.author}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Quote navigation dots */}
            <div className="flex justify-center mt-2 gap-2">
                {quotes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentQuote(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300
                            ${currentQuote === index 
                                ? 'bg-pink-500 w-4' 
                                : 'bg-pink-300'}`}
                        aria-label={`Quote ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Quote;