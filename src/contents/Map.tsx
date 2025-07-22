import { useState } from 'react';
import '../css/Map.css'

import EuropeMap from '../resources/Europe_Map.png';
// import EuropeSeaMap from '../resources/Europe_Map_Sea.png';

import MapDataaaa from '../resources/map.json'


const ROWS = 124
const COLS = 124

const genMap = (): number[][] => {
    let data: number[][] = MapDataaaa.mapData

    // for( let i = 0; i < ROWS; i++ ){
    //     let ok = false
    //     for ( let j = COLS; j > 0; j-- ){
    //         if ( data[i][j] === 3 && ok === false){
    //             ok = true
    //             continue
    //         }
    //         if (data[i][j] === 3 && ok === true){
    //             ok = false;
    //             break
    //         }
    //         if ( ok === true ){
    //             data[i][j] = 3;
    //         }
    //         }
    // }

    return data;

    // The data map will contain the following zones:
    // 0- Sea
    // 1- Rivers
    // 2- TBD
    // 3- Terrain 
    // 4- TBD

    // The River will have the same color as the terrain but for style but will be considered different
}

interface MapProps {
    selectedCountry: string;
}


function MapEu({ selectedCountry }: MapProps){
    const [mapData, setMapData] = useState<number[][]>(genMap())
    const [countriesOnMap, setCountriesOnMap] = useState<string[]>([])

    const [activeCountries, setActiveCountries] = useState<Map<string, string>>(new Map() )

    // const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null)

    // console.log("Map component: Selected Country is", selectedCountry);
    // console.log(countriesOnMap)

    console.log(mapData)

    const addCountryOnMap = (row: number, col: number) => {
        // if ( countriesOnMap.includes(selectedCountry)){
        //     return
        // }
        // setCountriesOnMap(prevCountries => [...prevCountries, selectedCountry])
        if ( !selectedCountry || selectedCountry === ''){
            return
        }
        
        let str: string = `${row}-${col}`;

        setActiveCountries(prevCountr => {
            const newactiveCountries = new Map(prevCountr)
            if ( newactiveCountries.has(str)){
                if ( newactiveCountries.get(str) === selectedCountry ){
                    newactiveCountries.delete(str)
                }
                else{
                    newactiveCountries.set(str, selectedCountry)
                }
            }
            else{
                newactiveCountries.set(str, selectedCountry)
            }

            return newactiveCountries
        })

        setCountriesOnMap(prevCOuntries => [...prevCOuntries, selectedCountry])

    }

    const putTerrain = (row: number, column: number) => {
        setMapData(prevMap => {
            const newMapData = prevMap.map(r => [...r]);
            newMapData[row][column] = 3;
            return newMapData
        })
    }

    return(
        <div className="map">
            <img src={EuropeMap} alt="" id='Europe_Map' />
            {/* <img src={EuropeSeaMap} alt="" id='Europe_Sea'/> */}
            <div 
                className="map-grid"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
                >
                {/* Render each cell of the grid */}
                {mapData.map((row, rowIndex) => (
                    row.map((cellValue, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`map-cell zone-${cellValue}`}
                            // onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                            // onMouseLeave={() => setHoveredCell(null)}
                            onClick={(e) => {
                                // putTerrain(rowIndex, colIndex)
                                addCountryOnMap(rowIndex, colIndex)
                            }}
                        >
                            { activeCountries.has(`${rowIndex}-${colIndex}`) && (
                                <div>
                                    {/* {activeCountries.get(`${rowIndex}-${colIndex}`)} */}
                                </div>
                                )
                            }
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}

export default MapEu;