import './table-component.css';
import TableItem from '../table-item-component/table-item-component';

type Document = {
  documents : string;
  workpackage: string;
  __v : number;
  _id : string;
};

type TableProps = {
  documents : Document[]
}

const Table: React.FC<TableProps> = ({documents}) => {

  if(documents){
    console.log(documents)
  }


  //For each object in the array of documents, I have to first get the workpackage names and display them
  return (
    <div id='table'>
      <div id='table-top-row'>
          <h3 id='table-heading-identifier'>Identifikator</h3>
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