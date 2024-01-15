import './table-component.css';
import TableItem from '../table-item-component/table-item-component.js';
function Table (){

  return (
    <div id='table'>
      <div id='table-top-row'>
        <div class='table-top-row-heading'>
          <h3>ID</h3>
          <h3>Rechnung</h3>
          <h3>Auftrag</h3>
          <h3>POD</h3>
          </div>
      </div>
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />


    </div>
  )
}

export default Table