
import '../css/Countries.css'

import { useState } from "react";

interface CountriesProps {
    selectedCountry: string;
    setSelectedCountry: (country: string) => void;
}

function Countries({ selectedCountry, setSelectedCountry }: CountriesProps) {

    const [countries, setCountries] = useState<string[]>(["Rome"])
    const [countryText, setCountryText] = useState<string>('')

    const addCountry = (country: string) => {
        if (countryText.trim() !== ''){
            setCountries(prevCountries => [...prevCountries, countryText.trim()])
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addCountry(e.currentTarget.value);
            setCountryText('')
        }
    }

    const handleCheckboxChange = (country: string) => {
        setSelectedCountry(country)
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
            </div>
            <ul>
                {countries.map((countryTxt, countryIndex) => (
                    <li key={countryIndex}>
                        <input
                            type="checkbox" 
                            name="selectName" 
                            id="select_name"
                            onChange={() => handleCheckboxChange(countryTxt)}
                            checked={selectedCountry === countryTxt}
                            />
                        {countryTxt}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Countries;