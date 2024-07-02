'use client'
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import dynamic from 'next/dynamic';
import { DataProvider } from '@/components/DataProvider';


export default function Home() {

  const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
  });  

  return (
    <DataProvider>
      <div className='div'>
      <Topbar style={{zIndex:1000}}/> 
      <div style={{height:'100vh', display:'flex'}}>
        <Sidebar/>
        <Map/> 
      </div> 
      </div>
    </DataProvider>
  )
}


