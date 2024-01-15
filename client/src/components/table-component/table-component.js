import './table-component.css';
import TableItem from '../table-item-component/table-item-component.js';




function Table ({ documents}){

  if(documents){
    console.log(documents)
  }


  //For each object in the array of documents, I have to first get the workpackage names and display them
  return (
    <div id='table'>
      <div id='table-top-row'>
          <h3 id='table-heading'>Identifier</h3>
          <h3 id='table-heading'>Rechnung</h3>
          <h3 id='table-heading'>Auftrag</h3>
          <h3 id='table-heading'>POD</h3>
      </div>
      <hr id="table-top-line"></hr>
        {documents &&documents.map((document) =>   <TableItem infos ={document} />)}
    </div>
  )
}

export default Table