'use client'
import dynamic from 'next/dynamic';
import Sidebar from '../components/Sidebar/Sidebar'
import { Input } from '@mui/material';
import IndexedDB from '@/components/IndexDB/IndexDB';

export default function Home() {

  const Map = dynamic(() => import('../components/Map/Map'), {
    ssr: false,
  });  
  const IndexedDB = dynamic(() => import('@/components/IndexDB/IndexDB'), {
    ssr: false,
  });


  return (
    <>   
      <Map/>  
    </>
  )
}


