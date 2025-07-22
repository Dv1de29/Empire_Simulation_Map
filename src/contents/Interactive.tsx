import '../css/Interactive.css'

import MapEu from "./Map";

interface InteractiveProps{
    selectedCountry: string;
}

function Interactive({ selectedCountry }: InteractiveProps) {
    return (
        <div className="interactive">
            <div className="options">
                <div className="option"><span>{"Map"}</span></div>
                <div className="option"><span>{"Colors"}</span></div>
                <div className="option"><span>{"Culture"}</span></div>
            </div>
            <MapEu selectedCountry={selectedCountry} />
        </div>
    );
}

export default Interactive;