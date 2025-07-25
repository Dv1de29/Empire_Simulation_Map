import '../css/SettingsMenu.css'

import SettingSlider from './SettingSlider';
import Countries from './Countries';


import { SliderValues } from '../types/types';


interface SettingsMenuProps {
    selectedCountry: string;
    setSelectedCountry: (country: string) => void;
    
    selectedColor: string,
    setSelectedColor: (color: string) => void;

    sliderValues: SliderValues,
    setSliderValues: (SliderValues: SliderValues) => void;
}


function SettingsMenu({ 
    selectedCountry, 
    setSelectedCountry, 
    selectedColor, 
    setSelectedColor,
    sliderValues,
    setSliderValues, 
}: SettingsMenuProps) {

    const handleSliderChange = (type: keyof SliderValues, newValue: number) => {
        const updatedValues: SliderValues = {
            ...sliderValues,
            [type]: newValue,
        };
        setSliderValues(updatedValues);
    };

    return (
        <div className="settings_box">
            <div className="settings">
                <SettingSlider 
                    heading='cost' 
                    type='sea' 
                    color='blue'
                    value={sliderValues.seaCost}
                    onChange={(newValue) => handleSliderChange('seaCost', newValue)} 
                    />
                <SettingSlider 
                    heading='cost' 
                    type='river' 
                    color='yellow'
                    value={sliderValues.riverCost}
                    onChange={(newValue) => handleSliderChange('riverCost', newValue)} 
                    />
                <SettingSlider 
                    heading='cost' 
                    type='terrain' 
                    color='green'
                    value={sliderValues.landCost}
                    onChange={(newValue) => handleSliderChange('landCost', newValue)} 
                    />
                <SettingSlider 
                    heading='change' 
                    type='change' 
                    color='purple' 
                    value={sliderValues.changeCost}
                    onChange={(newValue) => handleSliderChange('changeCost', newValue)}
                    />
                <SettingSlider 
                    heading='size' 
                    type='Size' 
                    color='red'
                    value={sliderValues.size}
                    onChange={(newValue) => handleSliderChange('size', newValue)} 
                    />

                <Countries 
                    setSelectedCountry={setSelectedCountry} 
                    selectedCountry={selectedCountry} 
                    setSelectedColor={setSelectedColor} 
                    selectedColor={selectedColor} 
                />    

                <button>{"Render"}</button>
            </div>
        </div>
    );
}

export default SettingsMenu;