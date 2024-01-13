import './header-component.css';
import { IoIosLogOut } from "react-icons/io";


function Header(){
  return (
    <div id='header-component'>
      <div id = 'header-component-options'>
        <IoIosLogOut className='item-icon'/>
        <p>Logout</p>
      </div>
    </div>
  )
}


export default Header;