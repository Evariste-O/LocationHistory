'use client'
import dynamic from 'next/dynamic';


export default function Home() {

  const Map = dynamic(() => import('../components/Map/Map'), {
    ssr: false,
  });  



  return (
    <>   
      <Map/>  
    </>
  )
}


