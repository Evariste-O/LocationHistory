'use client'
import { DateRangePicker, Modal, Radio, RadioGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import DatePicker from './DatePicker';
import DisplayTypePicker from './DisplayTypePicker';
import IndexedDB from './IndexDB';
import { useState } from 'react';

export default function Topbar({}){
    const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

    const [modalOpen, setModalOpen]=useState(false)

    return(
        <div style={{ display:'flex', flexDirection:'horizontal', padding:5, gap:5}}>
            <IndexedDB/>
            <Modal open={modalOpen} onClose={()=>{setModalOpen(false)}}><IndexedDB/></Modal>
            <DatePicker/>
            <DisplayTypePicker/>
        </div>
    );
}

