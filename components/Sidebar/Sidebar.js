'use client'
import { DateRangePicker, Slider, Modal, Button, Radio, RadioGroup, Form} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import pubSub from '../PubSub'
import IndexedDB from '../IndexDB/IndexDB';
import { useState } from 'react';

export default function Sidebar({}){
    const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

    const [modalOpen, setModalOpen]=useState(false)

    function onDateSelected(date)
    {
        pubSub.publish('dateSelected', date);
    }

    function onChange(value){
        pubSub.publish('displayType', value)
    }
    

    return(
        <div style={{ display:'flex', flexDirection:'horizontal', padding:5, gap:5}}>
            <Button onClick={()=>{setModalOpen(true)}}>Upload</Button>
            <Modal open={modalOpen} onClose={()=>{setModalOpen(false)}}><IndexedDB/></Modal>
            <DateRangePicker style={{zIndex: 1000}} onOk={onDateSelected} showMeridian  ranges={[]}  character=' - ' format='yy.MM.dd hh:mm' defaultCalendarValue={[new Date('2021-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}/>
            <RadioGroup onChange={onChange} name="radioList" inline appearance="picker" defaultValue="heatmap">
                <RadioLabel>Display: </RadioLabel>
                <Radio value="heatmap">Heatmap</Radio>
                <Radio value="points">Points</Radio>
            </RadioGroup>
        </div>
    );
}

