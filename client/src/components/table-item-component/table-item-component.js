import './table-item-component.css';
import { MdCheckBox } from "react-icons/md";
import { CgDanger } from "react-icons/cg";



function TableItem (){

  return (
    <div id='table-row'>
      <p>isf24853g3g</p>
      <div id='table-item-icon-list'>
        <MdCheckBox className='item-icon green'/>
        <MdCheckBox className='item-icon green'/>
        <CgDanger className='item-icon red'/>
      </div>
    </div>
  )
}

export default TableItem