'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Circle, Tooltip, useMap, Polyline} from 'react-leaflet'
import {db} from '../db'
import { useState } from 'react'
import IndexedDB from '../IndexDB/IndexDB'
import {Button} from '@mui/material'
import { DateRangePicker, Slider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


function Map({}){
    const [locations, setLocations] = useState([])
    const [fetchedLocations, setFetchedLocations] = useState([])
    const [bounds, setBounds] = useState([])
    const [currentDate, setCurrentDate] = useState("")
    const [accuracy, setAccuracy] = useState()
    const [searchDateStart, setSearchDateStart] = useState()
    const [searchDateEnd, setSearchDateEnd] = useState()

    const style = {
        width: '100%',
        height:'100%'
    }

    function ChangeView({ bounds }) {
        const map = useMap();
        if(bounds.length>0){
            map.fitBounds(bounds)
        }
        return null;
    }

    const onclickGetLocations = async () => {
        db.locations.where('timestamp').between(searchDateStart, searchDateEnd).toArray().then(locations => {
            console.log("fetched locations:") 
            console.log(locations)
            setFetchedLocations(locations);
            setLocations(locations.filter(location => location.accuracy < 500))
            setBounds(locations.map(location => [location.latitude/10000000, location.longitude/10000000]))
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

    const onDateSelected = (value) => { 
        if(value != null){
            setSearchDateStart(Math.floor(new Date(value[0]).getTime()/1000))
            setSearchDateEnd(Math.floor(new Date(value[1]).getTime()/1000))
            console.log(searchDateStart)
            console.log(searchDateEnd)
        }
    }

    const onSlidingbarChange = (value)=>{
        setLocations(fetchedLocations.filter(location => location.timestamp<value))
    }

    return(
        <>
        <div style={{width:500}}>
            <DateRangePicker onChange={onDateSelected} showOneCalendar ranges={[]}/>
            <IndexedDB/>
            <Button variant='contained' onClick={onclickGetLocations}>get Location Set</Button>
            <Button variant='contained' onClick={onclickAnimation}>run Animation</Button>
            <p>Number of locations fetched: {fetchedLocations.length}</p>
            <p>Date: {currentDate}</p>
            <p>Accuracy: {accuracy}</p>
            <Slider
                progress
                defaultValue={0}
                onChange={onSlidingbarChange}
                min={searchDateStart}
                max={searchDateEnd}
            />
        </div>
            <MapContainer style={style} center={[0,0]} zoom={3} scrollWheelZoom={true}>   
                <ChangeView bounds={bounds}/>      
                <TileLayer
                attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* {locations?.map((location)=>(
                    <Circle key={location.id} center={[location.latitude/10000000,location.longitude/10000000]} pathOptions={{color: 'red'}} radius={15}/>
                ))} */}
                <Polyline positions={bounds}/>
            </MapContainer>
        </>
    );
}

export default Map;