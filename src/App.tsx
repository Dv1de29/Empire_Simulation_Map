import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Header from './contents/Header';

import SettingsMenu from './contents/SettingsMenu';
import Interactive from './contents/Interactive';


import { SliderValues } from './types/types';

function App() {

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [sliderValues, setSliderValues] = useState<SliderValues>({
    seaCost: 5,
    riverCost: 5,
    landCost: 5, 
    changeCost: 5,
    size: 100,
  })

  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <SettingsMenu 
            setSelectedCountry={setSelectedCountry} 
            selectedCountry={selectedCountry} 
            setSelectedColor={setSelectedColor} 
            selectedColor={selectedColor}
            sliderValues={sliderValues}
            setSliderValues={setSliderValues}
          />
          <Interactive 
            selectedCountry={selectedCountry}
            selectedColor={selectedColor} 
            sliderValues={sliderValues}
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
