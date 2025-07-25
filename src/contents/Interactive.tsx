import '../css/Interactive.css'

import MapEu from "./Map";

import { SliderValues } from '../types/types';

interface InteractiveProps{
    selectedCountry: string;
    selectedColor: string
    sliderValues: SliderValues,
}

function Interactive({ 
    selectedCountry,
    selectedColor,
    sliderValues
}: InteractiveProps) {
    return (
        <div className="interactive">
            <div className="options">
                <div className="option"><span>{"Map"}</span></div>
                <div className="option"><span>{"Colors"}</span></div>
                <div className="option"><span>{"Culture"}</span></div>
            </div>
            <MapEu 
                selectedCountry={selectedCountry} 
                selectedColor={selectedColor}
                sliderValues={sliderValues}
            />
        </div>
    );
}

export default Interactive;