import '../css/Slider.css'


interface Props{
    heading: string,
    type: string,
    color: string,
    value: number;
    onChange: (newValue: number) => void;
}

function setLabel(heading: string, type: string){
    switch(heading){
        case 'cost':
            return type[0].toUpperCase() + type.slice(1) + " traveling cost: ";
        case 'change':
            return "Change cost";
        case 'size':
            return "Max empire size: "
    }
}

function getColor(color: string){
    switch(color){
        case 'blue':
            return {
                track: '#cfe2ff',
                thumb: '#007bff',
                value: '#0056b3',
            };
        case 'green':
            return {
                track: '#d4edda',
                thumb: '#28a745',
                value: '#1e7e34',
            };
        case 'yellow':
            return {
                track: '#fff3cd',
                thumb: '#ffc107',
                value: '#d39e00',
            };
        case 'purple':
            return {
                track: '#e2d9ff',
                thumb: '#6f42c1',
                value: '#5a2d9b',
            };
        case 'red':
            return {
                track: '#f8d7da',
                thumb: '#dc3545',
                value: '#c82333',
            };
        default:
            return { // Fallback colors
                track: '#e9ecef',
                thumb: '#007bff',
                value: '#0056b3',
            };
    }
}

function SettingSlider({ heading, type, color, value, onChange}: Props) {
    const COLOR = getColor(color)

    const styleSlider = {
        '--slider-track-bg': COLOR.track,
        '--slider-thumb-bg': COLOR.thumb,
        '--slider-value-color': COLOR.value,
    } as React.CSSProperties;

    return (
        <div className="slider" id={type} style={styleSlider}>
            <label htmlFor={type + "_cost"}>{setLabel(heading, type)}</label>
            <input 
                type="range" 
                id={type + "_cost"}
                value={value} 
                min={"1"} 
                max={heading === 'size' ? "5000" : "40"}
                onChange={(e) => onChange(Number(e.target.value))}
                />
            <div className="value-range">{"Value: " + value}</div>
        </div>
    );
}

export default SettingSlider;