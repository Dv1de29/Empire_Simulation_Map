import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Header from './contents/Header';

import SettingsMenu from './contents/SettingsMenu';
import Interactive from './contents/Interactive';

function App() {

  const [selectedCountry, setSelectedCountry] = useState<string>('');

  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <SettingsMenu setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
          <Interactive selectedCountry={selectedCountry} />
        </main>
      </div>
    </Router>
  );
}

export default App;
