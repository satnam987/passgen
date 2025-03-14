import React from 'react';

interface SliderProps {
  id: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export default function Slider({ id, min, max, value, onChange }: SliderProps) {
  // Bereken de positie voor het label als percentage
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Veilige functie voor onChange die controleert of onChange bestaat
  const handleChange = (newValue: number) => {
    if (typeof onChange === 'function') {
      onChange(newValue);
    } else {
      console.warn('onChange is not a function in Slider component');
    }
  };
  
  return (
    <div className="relative">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      
      {/* Custom track */}
      <div 
        className="absolute pointer-events-none top-1/2 left-0 transform -translate-y-1/2 h-2 bg-blue-500 rounded-lg" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
} 