'use client';

import '../globals.css'
import NavBar from '@/components/navbar-component/navbar-component';
import Table from '@/components/table-component/table-component';
import Search from '@/components/search-component/search-component.js';
import Info from '@/components/info-component/info-component';
import Header from '@/components/header-component/header-component';
import React, { useState, useEffect } from 'react'




export default function Dashboard() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {

    fetch('http://localhost:8080/alldocuments')
    .then((response)=> response.json())
    .then((data) => {
      setDocuments(data);
      console.log(documents)
    })
    .catch ((err) => {
      console.log(err.message);
    });
  }, [])


  return (
  <div className = 'container-dashboard-all'>  
    <Header />
    <div className='container'> 
        <NavBar />
      <div className='container-box'>
        <Search />
        <Table documents = {documents} />
      </div>
   <Info />
    </div>
  </div>
  )
}



