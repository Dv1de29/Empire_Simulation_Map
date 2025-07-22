import '../css/SettingsMenu.css'

import SettingSlider from './SettingSlider';

import Countries from './Countries';

interface SettingsMenuProps {
    selectedCountry: string;
    setSelectedCountry: (country: string) => void;
}

function SettingsMenu({ selectedCountry, setSelectedCountry }: SettingsMenuProps) {

    return (
        <div className="settings_box">
            <div className="settings">
                <SettingSlider heading='cost' type='sea' color='blue' />
                <SettingSlider heading='cost' type='river' color='yellow' />
                <SettingSlider heading='cost' type='terrain' color='green' />
                <SettingSlider heading='change' type='change' color='purple' />
                <SettingSlider heading='size' type='Size' color='red' />

                <Countries setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />    

                <button>{"Render"}</button>
            </div>
        </div>
    );
}

export default SettingsMenu;