import React, { Component } from 'react';
import AddColorForm from './components/AddColorForm';
import FilterForm from './components/FilterForm';
import ColorList from './components/ColorList';

import './styles/App.scss';

interface AppState {
  colors: string[];
  filters: {
    red: boolean;
    green: boolean;
    blue: boolean;
    saturation: boolean;
  };
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const storedColors = JSON.parse(localStorage.getItem('colors') || '[]') as string[];

    this.state = {
      colors: [...storedColors, '#FF0000', '#00FF00', '#0000FF'], // default colors
      filters: {
        red: false,
        green: false,
        blue: false,
        saturation: false,
      },
    };
  }

  addColor = (color: string): void => {
    this.setState((prevState) => {
      const newColors = [...prevState.colors, color];
      localStorage.setItem('colors', JSON.stringify(newColors.filter((c) => !['#FF0000', '#00FF00', '#0000FF'].includes(c))));
      return { colors: newColors };
    });
  };

  removeColor = (color: string): void => {
    this.setState((prevState) => {
      const newColors = prevState.colors.filter((c) => c !== color);
      localStorage.setItem('colors', JSON.stringify(newColors.filter((c) => !['#FF0000', '#00FF00', '#0000FF'].includes(c))));
      return { colors: newColors };
    });
  };

  updateFilters = (filterName: string, value: boolean): void => {
    this.setState((prevState) => ({
      filters: { ...prevState.filters, [filterName]: value },
    }));
  };

  getFilteredColors(): string[] {
    const { colors, filters } = this.state;

    return colors.filter((color) => {
      const rgb = this.hexToRgb(color);
      const hsl = this.rgbToHsl(rgb);
      return (
        (!filters.red || rgb.r > 127) &&
        (!filters.green || rgb.g > 127) &&
        (!filters.blue || rgb.b > 127) &&
        (!filters.saturation || hsl.s > 0.5) // Use hsl.s instead of hsl.saturation
      );
    }).sort((a, b) => {
      const rgbA = this.hexToRgb(a);
      const rgbB = this.hexToRgb(b);
      return rgbB.r - rgbA.r || rgbB.g - rgbA.g || rgbB.b - rgbA.b;
    });
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  rgbToHsl(rgb: { r: number; g: number; b: number }): { h: number; s: number; l: number } {
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h, s, l };
  }

  render(): JSX.Element {
    const filteredColors = this.getFilteredColors();
    return (
      <div className="app">
        <AddColorForm onAddColor={this.addColor} />
        <FilterForm filters={this.state.filters} onFilterChange={this.updateFilters} />
        <ColorList colors={filteredColors} onRemoveColor={this.removeColor} />
      </div>
    );
  }
}

export default App;
