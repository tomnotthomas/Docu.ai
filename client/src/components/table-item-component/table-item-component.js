import './table-item-component.css';
import { MdCheckBox } from "react-icons/md";
import { CgDanger } from "react-icons/cg";



function TableItem ({infos}){

  return (
    <div id='table-row'>
      <p>{infos.workpackage}</p>
      <div id='table-item-icon-list'>
        <MdCheckBox className='item-icon green'/>
        <MdCheckBox className='item-icon green'/>
        <CgDanger className='item-icon red'/>
      </div>
    </div>
  )
}

export default TableItem