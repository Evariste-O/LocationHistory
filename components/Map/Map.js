'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Circle, Tooltip, useMap, Polyline} from 'react-leaflet'
import {db} from '../db'
import Locations from './Locations';
import { useState, useEffect, useRef } from 'react'
import pubSub from '../PubSub'
import { Slider } from 'rsuite'
import "leaflet.heat";


function Map({}){
    const [locations, setLocations] = useState([])
    const [fetchedLocations, setFetchedLocations] = useState([])
    const [bounds, setBounds] = useState([])
    const [currentDate, setCurrentDate] = useState("")
    const [searchDateStart, setSearchDateStart] = useState()
    const [displayType, setDisplayType] = useState('heatmap')
    const [searchDateEnd, setSearchDateEnd] = useState()
    
    
    
    useEffect(() => {
        const DateSub = pubSub.subscribe('dateSelected', (selectedDate) => {
            if(selectedDate != null){
                setSearchDateStart(Math.floor(new Date(selectedDate[0]).getTime()/1000))
                setSearchDateEnd(Math.floor(new Date(selectedDate[1]).getTime()/1000))
                fetchLocations(Math.floor(new Date(selectedDate[0]).getTime()/1000) , Math.floor(new Date(selectedDate[1]).getTime()/1000))
            }
        });
        const DisplaySub = pubSub.subscribe('displayType', (value)=>{
            setDisplayType(value)
        })
        
        return () => {
          pubSub.unsubscribe(DateSub);
          pubSub.unsubscribe(DisplaySub);
        };
      }, []);
    


    function ChangeView({ bounds, displayType }) {       
        const map = useMap();
        if(bounds.length > 0 ){
            map.fitBounds(bounds)
        }
        map.eachLayer(layer =>{
            if(layer._heat){
                map.removeLayer(layer)
            }
        })
        if(displayType === 'heatmap')
        {
            map.addLayer(L.heatLayer(bounds))
        }
    }

    const fetchLocations = async (start, end) => {
        db.locations.where('timestamp').between(start, end).toArray().then(locations => {
            console.log(locations)
            setFetchedLocations(locations);
            setLocations(locations.filter(location => location.accuracy < 500 && !isNaN(location.latitude) && !isNaN(location.longitude)))
            setBounds(locations.filter(location => location.accuracy < 500 && !isNaN(location.latitude) && !isNaN(location.longitude)).map(location => [location.latitude/10000000, location.longitude/10000000]))
        })
    }

    const onclickAnimation = async () => {
        let j = 0;
        for (let i = 0; i < 86400 && j < fetchedLocations.length; i+=60) {
            const curentMinuteStart = searchDateStart + i
            const currentMinuteEnd = curentMinuteStart + 60
            const locationsInThatMinute = []
            setCurrentDate(new Date((searchDateStart + i) * 1000).toString()); 
            while (j < fetchedLocations.length && fetchedLocations[j].timestamp >= curentMinuteStart && fetchedLocations[j].timestamp <= currentMinuteEnd) {
                if(fetchedLocations[j].accuracy < 500){
                    locationsInThatMinute.push(fetchedLocations[j])
                }
                j++;
            }
            if(locationsInThatMinute.length !== 0)
            {
                setAccuracy(locationsInThatMinute[0].accuracy);
                setLocations(locationsInThatMinute);
            }
            await new Promise(r => setTimeout(r, 20));
        }
    }

    const onSlidingbarChange = (value)=>{
        setLocations(fetchedLocations.filter(location => location.timestamp<value && location.timestamp>value-1000))
        setCurrentDate(new Date(value*1000).toString())
    }

    return( 
        <>
            <MapContainer style={{width:'100%', height:'100%', zIndex:1}} center={[0,0]} zoom={3} scrollWheelZoom={true} zoomControl={false}>
                <p style={{position:'absolute', zIndex:1000, top:0, left:'auto', backgroundColor:'black'}}>{currentDate}</p>   
                <ChangeView style={{zIndex:1000, height:500, width:500}} bounds={bounds} displayType={displayType}/>  
                <TileLayer
                attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {displayType === 'points' &&
                    <Locations locations={locations} color={'red'} />
                }
            </MapContainer>     
        </>    
    );
}

export default Map;