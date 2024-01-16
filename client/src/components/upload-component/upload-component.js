import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import './upload-component.css';

const fileTypes = ["JPG", "PDF"];


function DragDrop (){

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <div id='upload-window'>
      <h2 id='document-upload'>Dokumente hochladen</h2>
      <div>
        <FileUploader
          handleChange={handleChange}
          name="Upload-documents"
          types={fileTypes}
          label = {"Zieh die Dokumente hier hinein"}
          onTypeError = {(err) => {"Es werden nur pdf und .png Dateien unterstützt"}}
          children = {<div id='upload'>Dokumente hinein ziehen </div>}/>
      </div>
    </div>  
  )
}

export default DragDrop