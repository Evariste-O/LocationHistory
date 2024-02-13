'use client'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Circle, Tooltip, useMap} from 'react-leaflet'
import {db} from '../db'
import { useState } from 'react'
import IndexedDB from '../IndexDB/IndexDB'
import { DatePicker,  LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';


function Map({}){
    const [locations, setLocations] = useState([])
    const [fetchedLocations, setFetchedLocations] = useState([])
    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(14)
    const [currentDate, setCurrentDate] = useState("")
    const [accuracy, setAccuracy] = useState()
    const [searchDateStart, setSearchDateStart] = useState()
    const [searchDateEnd, setSearchDateEnd] = useState()

    const style = {
        width: '100%',
        height:'100%'
    }

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    const onclickGetLocations = async () => {
        db.locations.where('timestamp').between(searchDateStart, searchDateEnd).toArray().then(locations => {
            console.log(locations) 
            setFetchedLocations(locations);
            setZoom(14)
            setCenter([locations[0].latitude/10000000, locations[0].longitude/10000000])
            console.log("locations fetched")
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
                setCenter([locationsInThatMinute[0].latitude / 10000000, locationsInThatMinute[0].longitude / 10000000]);
                setAccuracy(locationsInThatMinute[0].accuracy);
                setLocations(locationsInThatMinute);
            }
            await new Promise(r => setTimeout(r, 20));
        }
    }

    const onclickshowOnMap = () =>{
        setLocations(fetchedLocations.filter(location => location.accuracy < 500))
    }

    const onAcceptStart = (value) =>{
        setSearchDateStart(new Date(value).getTime()/1000)
    }
    const onAcceptEnd = (value) =>{
        setSearchDateEnd(new Date(value).getTime()/1000)
    }

    return(
        <>
        <div style={{width:300}}>
            <IndexedDB/>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                <p>Start:</p>
                <DatePicker onAccept={onAcceptStart}/>
                <p>End:</p>
                <DatePicker onAccept={onAcceptEnd}/>
            </LocalizationProvider>
            <button onClick={onclickGetLocations}>get Location Set</button>
            <button onClick={onclickAnimation}>run Animation</button>
            <button onClick={onclickshowOnMap}>show all points on map</button>
            <p>Number of locations fetched: {fetchedLocations.length}</p>
            <p>Date: {currentDate}</p>
            <p>Accuracy: {accuracy}</p>
        </div>
            <MapContainer style={style} center={[0,0]} zoom={16} scrollWheelZoom={true}>   
                <ChangeView center={center} zoom={zoom}/>      
                <TileLayer
                attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations?.map((location)=>(
                    <Circle key={location.id} center={[location.latitude/10000000,location.longitude/10000000]} pathOptions={{color: 'red'}} radius={3}/>
                ))}
            </MapContainer>
        </>
    );
}

export default Map;