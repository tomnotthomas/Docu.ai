import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import './upload-component.css';

const fileTypes = ["JPG", "PDF"];


function DragDrop (){
  const [file, setFile] = useState(null);

  const handleChange = (newFiles) => {
    // Handle only the first file
    const file = newFiles[0];
    console.log("Selected file:", file); // This should log the file object
    setFile(file);
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
    }

    // Fetch logic
    fetch("http://localhost:8080/uploaddoc", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log("File uploaded successfully:", data);
    })
    .catch(error => {
      console.error("Error uploading file:", error);
    });
  };


  return (
    <div id='upload-window'>
      <h2 id='document-upload'>Dokumente hochladen</h2>
      <div>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="Upload-documents"
          types={fileTypes}
          label={"Zieh die Dokumente hier hinein"}
          onTypeError={(err) => {"Es werden nur pdf und .png Dateien unterstützt"}}
          children={<div id='upload'>Dokumente hinein ziehen </div>}/>
      </div>
    </div>  
  )
}

export default DragDrop;