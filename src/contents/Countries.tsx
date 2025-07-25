
import '../css/Countries.css'

import { useState } from "react";

interface CountriesProps {
    selectedCountry: string;
    setSelectedCountry: (country: string) => void;

    selectedColor: string,
    setSelectedColor: (color: string) => void;
}

function Countries({ 
    selectedCountry, 
    setSelectedCountry, 
    selectedColor, 
    setSelectedColor 
}: CountriesProps) {

    const [countries, setCountries] = useState<string[]>(["Rome"])
    const [colors, setColors] = useState<string[]>(['#D32929'])

    const [countryText, setCountryText] = useState<string>('')
    const [countrycol, setCountryCol] = useState<string>('#E5DBB7')

    const addCountry = (country: string) => {
        if ( countryText.trim() === '' || countries.includes(country) || colors.includes(countrycol)){
            alert('Select a different country and color that no longer exists')
            return
        }
        setCountries(prevCountries => [...prevCountries, countryText.trim()])
        setColors(prevColors => [...prevColors, countrycol])
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addCountry(e.currentTarget.value.trim());
            setCountryText('')
        }
    }
    
    const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let col = e.target.value
        if ( colors.includes(col) ){
            alert("Please select another color that is not selected on other countries")
            return
        }
        setColors(prevColors => {
            const newColors = [...prevColors];
            newColors[index] = col;      
            return newColors;      
        });
    }

    const handleCheckboxChange = (country: string, color: string) => {
        setSelectedCountry(country)
        setSelectedColor(color);
    }


    return (
        <div className="counties">
            <div className="new_countr">
                <label htmlFor="add_countr_input">{"Add a new country: "}</label>
                <input 
                    id="add_countr_input"
                    className="add_countr_input"
                    type="text"
                    value={countryText}
                    onChange={(e) => setCountryText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                    <input 
                        type="color" 
                        name="selectColor" 
                        id="select_color" 
                        onChange={(e) => {setCountryCol(e.target.value)}}
                        value={countrycol}
                    />                    
            </div>
            <ul>
                {countries.map((countryTxt, countryIndex) => (
                    <li key={countryIndex}>
                        <input
                            type="checkbox" 
                            name="selectName" 
                            id="select_name"
                            onChange={() => handleCheckboxChange(countryTxt, colors[countryIndex])}
                            checked={selectedCountry === countryTxt}
                            />
                        {countryTxt}
                        <input 
                            type="color" 
                            name="selectColor" 
                            id="select_color" 
                            onChange={(e) => handleChangeColor(e, countryIndex)}
                            value={colors[countryIndex]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Countries;