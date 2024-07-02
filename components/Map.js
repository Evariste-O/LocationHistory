'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, LayersControl  } from 'react-leaflet'
import "leaflet.heat";
import { useData } from './DataProvider';
import Locations from './Locations';

function ChangeView({ displayType, data }) { 
    const map = useMap();
    let bounds = [];
    if(data){
        bounds = data.filter(location => location.accuracy < 500 && !isNaN(location.latitude) && !isNaN(location.longitude)).map(location => [location.latitude/10000000, location.longitude/10000000])     
    } 
    useEffect(() => { 
        if(bounds.length > 0 ){
            map.fitBounds(bounds)
        }
    }, [data]);
    map.eachLayer(layer =>{
        if(layer._heat){
            map.removeLayer(layer)
        }
    })
    if(displayType == "heatmap"){
        map.addLayer(L.heatLayer(bounds))
    }
}

function Map({}){
    const { filteredData, displayType} = useData();

    return( 
        <>
            <MapContainer style={{width:'100%', height:'100%', zIndex:1}} center={[0,0]} zoom={3} scrollWheelZoom={true} zoomControl={false}>
                <ChangeView displayType={displayType} data={filteredData}/>  
            
                <LayersControl position='bottomleft'>
                    <LayersControl.BaseLayer name='Satelite'>
                        <TileLayer
                        url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                        maxZoom= {20}
                        subdomains={['mt1','mt2','mt3']}
                        keepBuffer
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked  name='Default'>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                {displayType === 'points' &&
                    <Locations locations={filteredData}  color={'red'} />
                }
            </MapContainer>     
        </>    
    );
}

export default Map;



















    // const fetchLocations = async (start, end) => {
    //     db.locations.where('timestamp').between(start, end).toArray().then(locations => {
    //         console.log(locations)
    //         setFetchedLocations(locations);
    //         setLocations(locations.filter(location => location.accuracy < 500 && !isNaN(location.latitude) && !isNaN(location.longitude)))
    //         setBounds(locations.filter(location => location.accuracy < 500 && !isNaN(location.latitude) && !isNaN(location.longitude)).map(location => [location.latitude/10000000, location.longitude/10000000]))
    //     })
    // }

    // const onclickAnimation = async () => {
    //     let j = 0;
    //     for (let i = 0; i < 86400 && j < fetchedLocations.length; i+=60) {
    //         const curentMinuteStart = searchDateStart + i
    //         const currentMinuteEnd = curentMinuteStart + 60
    //         const locationsInThatMinute = []
    //         setCurrentDate(new Date((searchDateStart + i) * 1000).toString()); 
    //         while (j < fetchedLocations.length && fetchedLocations[j].timestamp >= curentMinuteStart && fetchedLocations[j].timestamp <= currentMinuteEnd) {
    //             if(fetchedLocations[j].accuracy < 500){
    //                 locationsInThatMinute.push(fetchedLocations[j])
    //             }
    //             j++;
    //         }
    //         if(locationsInThatMinute.length !== 0)
    //         {
    //             setAccuracy(locationsInThatMinute[0].accuracy);
    //             setLocations(locationsInThatMinute);
    //         }
    //         await new Promise(r => setTimeout(r, 20));
    //     }
    // }

    // const onSlidingbarChange = (value)=>{
    //     setLocations(fetchedLocations.filter(location => location.timestamp<value && location.timestamp>value-1000))
    //     setCurrentDate(new Date(value*1000).toString())
    // }