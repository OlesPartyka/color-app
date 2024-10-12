import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/AddColorForm.scss';

interface AddColorFormProps {
  onAddColor: (color: string) => void;
}

const AddColorForm: React.FC<AddColorFormProps> = ({ onAddColor }) => {
  const [color, setColor] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (/^#([0-9A-Fa-f]{0,6})$/.test(value)) {
      setColor(value.toUpperCase());
    }
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (color.length === 7) {
      onAddColor(color);
      setColor('');
    }
  };

  return (
    <form className="add-color-form" onSubmit={handleSubmit}>
      <label htmlFor="colorInput">Add Color (HEX RGB):</label>
      <input
        id="colorInput"
        type="text"
        value={color}
        onChange={handleInputChange}
        maxLength={7}
        pattern="^#[0-9A-Fa-f]{6}$"
        title="Valid hex code"
        required
      />
      <button type="submit" disabled={color.length !== 7}>Add Color</button>
    </form>
  );
};

export default AddColorForm;
