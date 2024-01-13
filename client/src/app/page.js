import NavBar from '@/components/navbar-component/navbar-component';
import './globals.css';
import Table from '@/components/table-component/table-component';
import Search from '@/components/search-component/search-component.js';
import Info from '@/components/info-component/info-component';

export default function Home() {
  return (
    <div className='container'> 
      <NavBar />
      <div className='container-box'>
        <Search />
        <Table />
      </div>
      <Info />

      
    </div>
  )
}
