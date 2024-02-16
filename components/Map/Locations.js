'use client'
import 'leaflet/dist/leaflet.css'
import { Circle } from 'react-leaflet'

export default function location({locations, color}){
    return(
        <>
            {locations?.map((location)=>(
                <Circle key={location.id} center={[location.latitude/10000000,location.longitude/10000000]} pathOptions={{color: color}} radius={14}/>
            ))}
        </>
    )
}