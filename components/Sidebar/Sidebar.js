'use client'
import { DateRangePicker, Slider, Modal, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import pubSub from '../PubSub'
import IndexedDB from '../IndexDB/IndexDB';
import { useState } from 'react';

export default function Sidebar({}){
    const [modalOpen, setModalOpen]=useState(false)
    function onDateSelected(date)
    {
        pubSub.publish('dateSelected', date);
    }

    return(
        <div style={{width:300}}>
            <Button onClick={()=>{setModalOpen(true)}}>Upload</Button>
            <Modal open={modalOpen} onClose={()=>{setModalOpen(false)}}><IndexedDB/></Modal>
            <DateRangePicker style={{zIndex: 1000}} onOk={onDateSelected} showMeridian  ranges={[]}  character=' - ' format='yy.MM.dd hh:mm' defaultCalendarValue={[new Date('2021-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}/>
        </div>
    );
}

