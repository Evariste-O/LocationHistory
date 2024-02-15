import{db} from '../db'
import { useLiveQuery } from 'dexie-react-hooks';
import {Button} from '@mui/material'

export default function IndexedDB(){

    const fr =  new FileReader()
    
    fr.onload = function(e){
        console.log("start bulk add")
        const content = JSON.parse(e.target.result)
        const contentFiltered = content.locations.map(x=>({
                latitude:x.latitudeE7,
                longitude:x.longitudeE7,
                timestamp: Math.floor(new Date(x.timestamp).getTime()/1000),
                accuracy: x.accuracy
            }))
        console.log(contentFiltered)
        db.locations.clear().then(()=>{
            console.log("table cleared")
            db.locations.bulkAdd(contentFiltered).then(()=>{
                console.log("bulk add complete")
            })
        })
    }

    function handleChange(event){
        console.log("handlechnage")
        const document = event.target.files[0]
        fr.readAsText(document)
    }

    function onClickCLearDexie(){
        console.log("clearing locations...")
        db.locations.clear().then(()=>{
            console.log("location Table cleared")
        })
    }

    return(
        <>
        <input
          type="file"
          onChange={handleChange}
        />
            <Button variant="contained" onClick={onClickCLearDexie}>clear Locations</Button>
        </>
    )
}