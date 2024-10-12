import React from 'react';
import '../styles/ColorItem.scss';

interface ColorItemProps {
  color: string;
  onRemoveColor: (color: string) => void;
}

export const ColorItem: React.FC<ColorItemProps> = ({ color, onRemoveColor }) => {
  const isDefaultColor = ['#FF0000', '#00FF00', '#0000FF'].includes(color);

  return (
    <li className="color-item" data-color={color}>
      <div className="color-box" style={{ backgroundColor: color }}></div>
      <span>{color}</span>
      {!isDefaultColor && (
        <button onClick={() => onRemoveColor(color)}>x</button>
      )}
    </li>
  );
};
