import { useState } from "react";
import { Timeline } from 'rsuite';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon  from '@rsuite/icons/ArrowLeftLine';

export default function Sidebar({}){

    const [open, setOpen] = useState(false)
    const [width, setWidth] = useState(0)
    const [icon, setIcon] = useState('>')

    const openSideBar = () => {
        setOpen(open => !open)
        setWidth(width => {
            if(width ==0)
                return 200
            if(width==200)
                return 0
        })
    }

    return(
        <div style={{ width:width, zIndex:1000  }}>
            <div style={{marginLeft:(width+5), zIndex:1000, height:30, width:30, marginTop:'46vh', borderRadius: '50%', backgroundColor:'white', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute'  }} onClick={openSideBar}>
                {open ? 
                    <ArrowLeftLineIcon size="3em"/>
                    :
                    <ArrowRightLineIcon size="3em"/> 
                }
            </div>
            {open &&
                <Timeline endless style={{height:'100%', overflowY:'auto'}}>
                    <Timeline.Item>16:27:41 Your order starts processing</Timeline.Item>
                    <Timeline.Item>16:28:43 Your order to be ready for delivery</Timeline.Item>
                    <Timeline.Item>16:28:45 Your parcel has been out of the library</Timeline.Item>
                    <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
                    <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
                    <Timeline.Item>16:27:41 Your order starts processing</Timeline.Item>
                    <Timeline.Item>16:28:43 Your order to be ready for delivery</Timeline.Item>
                    <Timeline.Item>16:28:45 Your parcel has been out of the library</Timeline.Item>
                    <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
                    <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
                    <Timeline.Item>16:27:41 Your order starts processing</Timeline.Item>
                    <Timeline.Item>16:28:43 Your order to be ready for delivery</Timeline.Item>
                    <Timeline.Item>16:28:45 Your parcel has been out of the library</Timeline.Item>
                    <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
                    <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
                    <Timeline.Item>16:27:41 Your order starts processing</Timeline.Item>
                    <Timeline.Item>16:28:43 Your order to be ready for delivery</Timeline.Item>
                    <Timeline.Item>16:28:45 Your parcel has been out of the library</Timeline.Item>
                    <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
                    <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
                    <Timeline.Item>16:27:41 Your order starts processing</Timeline.Item>
                    <Timeline.Item>16:28:43 Your order to be ready for delivery</Timeline.Item>
                    <Timeline.Item>16:28:45 Your parcel has been out of the library</Timeline.Item>
                    <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
                    <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
                </Timeline>
            }
        </div>
    );
}