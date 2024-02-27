import{db} from '../db'
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import {Button, Uploader} from 'rsuite'

export default function IndexedDB(){
    const [progress, setProgress] = useState(0)
    const [number, setNumber] = useState(0)

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

        const chunkSize = 5000; 
        const chunks = [];
        for (let i = 0; i < contentFiltered.length; i += chunkSize) {
            console.log("chunk number " + i)
            chunks.push(contentFiltered.slice(i, i + chunkSize));
        }
        
        setNumber(chunks.length)
        db.locations.clear().then(()=>{
            console.log("table cleared")
            chunks.forEach(chunk =>{
                writeDataToDatabase(chunk)
                console.log("chunk processing...")
            })
        })
    }

    const writeDataToDatabase = async (data) => {
        try {
          await db.locations.bulkAdd(data);
          console.log("locations added" + number)
          setProgress(number => number+1)
        } catch (error) {
          console.error('Error writing data to database:', error);
        }
      };

    function handleChange(event){
        console.log("handle change")
        const document = event.target.files[0]
        fr.readAsText(document)
    }

    function onClickCLearDexie(){
        console.log("clearing locations...")
        db.locations.clear().then(()=>{
            console.log("location Table cleared")
        })
    }

    function onClickCheckDexie(){
        console.log("Checking locations...")
        db.locations.count().then((value)=>{console.log(value)})
    }

    return(
        <>
          <input  type="file" onChange={handleChange}/> 
          <button onClick={onClickCLearDexie}>clear</button>
          <button onClick={onClickCheckDexie}>check</button>
          <p>{progress} / {number}</p> 
        </>
    )
}