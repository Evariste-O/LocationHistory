'use client'
import Sidebar from '@/components/Sidebar/Sidebar';
import dynamic from 'next/dynamic';


export default function Home() {

  const Map = dynamic(() => import('../components/Map/Map'), {
    ssr: false,
  });  



  return (
    <> 
      <Sidebar style={{zIndex:1000}}/> 
      <Map/>  
    </>
  )
}


