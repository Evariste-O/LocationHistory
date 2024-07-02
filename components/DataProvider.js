import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dateRange, setDateRange] = useState(null)
  const [displayType, setDisplayType] = useState("heatmap")

  const setDataFromFile = async (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (e) => {
        const content = JSON.parse(e.target.result)
        const contentFiltered = content.locations.filter(location => !isNaN(location.latitudeE7) && !isNaN(location.longitudeE7)).map((x, index)=>({
                id: index,
                latitude:x.latitudeE7,
                longitude:x.longitudeE7,
                timestamp: Math.floor(new Date(x.timestamp).getTime()/1000),
                accuracy: x.accuracy
        }))
        console.log(contentFiltered)
        setData(contentFiltered)
        setFilteredData(contentFiltered)
    };
  };

  const setFilteredLocations = (date) =>{
    const dateStart = Math.floor(new Date(date[0]).getTime()/1000)
    const dateEnd = Math.floor(new Date(date[1]).getTime()/1000)
    setDateRange([dateStart, dateEnd])
    setFilteredData(data.filter(location => location.timestamp>dateStart && location.timestamp<dateEnd))
  }



  return (
    <DataContext.Provider value={{ setDataFromFile, dateRange, displayType, setDisplayType, filteredData, setFilteredLocations}}>
      {children}
    </DataContext.Provider>
  );
};