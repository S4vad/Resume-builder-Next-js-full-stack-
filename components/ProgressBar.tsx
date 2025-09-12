import React, { useEffect, useState } from "react";

interface ProgressProps {
  value: number;
}

export const FancyProgressBar: React.FC<ProgressProps> = ({ value }) => {
  const [bubbles, setBubbles] = useState<{ left: string; delay: string }[]>([]);

  useEffect(() => {
    // generate random bubbles
    const newBubbles = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      {/* Progress fill */}
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />

      {/* Animated bubbles */}
      <div className="absolute inset-0">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/60 rounded-full animate-bounce"
            style={{
              left: b.left,
              top: `${Math.random() * 100}%`,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};
