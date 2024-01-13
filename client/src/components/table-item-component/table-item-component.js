import './table-item-component.css';
import { MdCheckBox } from "react-icons/md";
import { CgDanger } from "react-icons/cg";



function TableItem (){

  return (
    <div id='table-row'>
      <p>isf24853g3g</p>
      <div id='table-item-icon-list'>
        <MdCheckBox class='item-icon green'/>
        <MdCheckBox class='item-icon green'/>
        <CgDanger class='item-icon red'/>
      </div>
    </div>
  )
}

export default TableItem