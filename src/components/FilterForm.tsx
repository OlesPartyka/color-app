import React from 'react';
import '../styles/FilterForm.scss';

interface FilterFormProps {
  filters: {
    red: boolean;
    green: boolean;
    blue: boolean;
    saturation: boolean;
  };
  onFilterChange: (filterName: string, value: boolean) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ filters, onFilterChange }) => {
  return (
    <form className="filter-form">
      <label>
        <input
          type="checkbox"
          checked={filters.red}
          onChange={() => onFilterChange('red', !filters.red)}
        />
        Red {'>'} 50%
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.green}
          onChange={() => onFilterChange('green', !filters.green)}
        />
        Green {'>'} 50%
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.blue}
          onChange={() => onFilterChange('blue', !filters.blue)}
        />
        Blue {'>'} 50%
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.saturation}
          onChange={() => onFilterChange('saturation', !filters.saturation)}
        />
        Saturation {'>'} 50%
      </label>
    </form>
  );
};

export default FilterForm;
