import{db} from './db'
import { useLiveQuery } from 'dexie-react-hooks';
import { useState, useRef } from 'react';
import {Button, Popover, Whisper} from 'rsuite'
import { useData } from './DataProvider';

export default function IndexedDB(){
    const { data, fetchData, setDataFromFile } = useData();
9

    function handleChange(event){
        console.log("handle change")
        const document = event.target.files[0]
        setDataFromFile(document)
        //fr.readAsText(document)
    }

    const handleClick = ()=>{
        document.getElementById('fileInput').click();
        //open()
    }

    return(
        <>
            <Button onClick={handleClick}>Choose File</Button>
            <input hidden id="fileInput" type="file" onChange={handleChange}/> 
        </>
    )
}