import{db} from '../db'
import { useLiveQuery } from 'dexie-react-hooks';

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
        const document = event.target.files[0]
        fr.readAsText(document)
    }

    return(
        <>
            <input type="file" onChange={handleChange}/>
        </>
    )
}