import React from 'react';
import { ColorItem } from './ColorItem';
import '../styles/ColorList.scss';

interface ColorListProps {
  colors: string[];
  onRemoveColor: (color: string) => void;
}

const ColorList: React.FC<ColorListProps> = ({ colors, onRemoveColor }) => {
  return (
    <ul className="color-list">
      {colors.map(color => (
        <ColorItem
          key={color}
          color={color}
          onRemoveColor={onRemoveColor}
        />
      ))}
    </ul>
  );
};

export default ColorList;
