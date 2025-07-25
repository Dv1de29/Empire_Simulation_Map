import { useState } from 'react';
import '../css/Map.css'

import EuropeMap from '../resources/Europe_Map.png';
// import EuropeSeaMap from '../resources/Europe_Map_Sea.png';

import MapDataaaa from '../resources/map.json'

import { searchTer, findNClosestCells } from './mapAlgorithm';

import { SliderValues, Point } from '../types/types';

interface MapProps {
    selectedCountry: string,
    selectedColor: string,
    sliderValues: SliderValues,
}

type CellData = {
    type: number; // 0-Sea, 1-Rivers, 3-Terrain
    countryId?: string; // Identifier for the country occupying this cell
    countryColor?: string; // Color of the country occupying this cell
    closestValue?: number
};

const ROWS = 124
const COLS = 124

const genMap = (): CellData[][] => {
    return MapDataaaa.mapData.map(row =>
        row.map(cellValue => ({ type: cellValue }))
    );

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

    // The data map will contain the following zones:
    // 0- Sea
    // 1- Rivers
    // 2- TBD
    // 3- Terrain 
    // 4- TBD

    // The River will have the same color as the terrain but for style but will be considered different
}


function MapEu({ 
    selectedCountry,
    selectedColor,
    sliderValues,
}: MapProps){
    const [mapData, setMapData] = useState<CellData[][]>(genMap())

    const [countriesOnMap, setCountriesOnMap] = useState<Map<string, string>>(new Map())
    const [activeCountries, setActiveCountries] = useState<Map<string, string>>(new Map() )

    let distGrid: Map<string, number> = new Map()


    // console.log("Map component: Selected Country is", selectedCountry);
    // console.log(countriesOnMap)

    console.log(mapData.map(row => row.map(cell => cell.type)))

    const drawCountries = (country: string, color: string, rowIndex: number, colIndex: number) => {
        const newMapData = mapData.map(row => row.map(cell => cell.type))
        distGrid = searchTer(
            newMapData, 
            {row: rowIndex, col: colIndex}, 
            {
                0: sliderValues.seaCost,
                1: sliderValues.riverCost,
                3: sliderValues.landCost,
            },
            sliderValues.changeCost
        )

        let pointsCountry = findNClosestCells(
            distGrid, 
            sliderValues.size,
            newMapData
        )

        setMapData(prevMap => {
            const newMapData = prevMap.map(row => row.map(cell => ({ ...cell }))); // Deep copy cells
            pointsCountry.forEach(cell => {
                let clstval = newMapData[cell.point.row][cell.point.col].closestValue 
                if (newMapData[cell.point.row] 
                    && newMapData[cell.point.row][cell.point.col] 
                    && newMapData[cell.point.row][cell.point.col].type !== 0
                ) {
                    if ( clstval === undefined || clstval > cell.cost){
                        newMapData[cell.point.row][cell.point.col].countryId = country;
                        newMapData[cell.point.row][cell.point.col].countryColor = color;
                        newMapData[cell.point.row][cell.point.col].closestValue = distGrid.get(`${cell.point.row}-${cell.point.col}`)
                    }
                }
            });
            return newMapData;
        });
    }
    
    const addCountryOnMap = (row: number, col: number) => {
        if ( !selectedCountry || selectedCountry === '' ){
            return
        }
        
        if ( countriesOnMap.has(selectedCountry) ){
            return
        }
        
        let str: string = `${row}-${col}`;

        // Adding to the list of existing countries with their respective colors
        setCountriesOnMap(
            prevCountries => {
                const newCountries = new Map(prevCountries)
                newCountries.set(selectedCountry, selectedColor)
                return newCountries
            }
        )

        // Ading to the list of countries their CAPITAL
        setActiveCountries(
            prevCountr => {
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
            }
        )

        // const newColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');


        drawCountries(selectedCountry, selectedColor, row, col)

    }

    const putTerrain = (row: number, column: number) => {
        setMapData(prevMap => {
            const newMapData = prevMap.map(r => [...r]);
            newMapData[row][column].type = 0;
            return newMapData
        })
    }

    return(
        <div className="map">
            {/* <img src={EuropeMap} alt="" id='Europe_Map' /> */}
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
                    row.map((CellData, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`map-cell zone-${CellData.type}`}
                            onClick={(e) => {
                                // putTerrain(rowIndex, colIndex)
                                addCountryOnMap(rowIndex, colIndex)
                            }}
                        style={CellData.countryId ? {backgroundColor: CellData.countryColor} : {}}
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