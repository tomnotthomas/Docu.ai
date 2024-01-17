import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import './upload-component.css';

const fileTypes = ["JPG", "PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (newFiles) => {
    const file = newFiles[0];
    console.log("Selected file:", file);
    setFile(file);
    uploadFile(file);
  };

  const getVorgang = (file) => {
    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    if (fileNameWithoutExtension.startsWith('Rechnung')) {
      return fileNameWithoutExtension.substr(8);
    }
    if (fileNameWithoutExtension.startsWith('Auftrag')) {
      return fileNameWithoutExtension.substr(7);
    }
    if (fileNameWithoutExtension.startsWith('POD')) {
      return fileNameWithoutExtension.substr(3);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await fetch("http://localhost:8080/uploaddoc", {
        method: "POST",
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }
      setUploadStatus("File uploaded successfully");

      const postData = {
        bucket: "documentsforgermany",
        photo: file.name.split('.').slice(0, -1).join('.')
      };

      const analyseResponse = await fetch('http://localhost:8080/analysedoc', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!analyseResponse.ok) {
        throw new Error('Analysis failed');
      }

      const vorgangData = { vorgang: getVorgang(file) };
      console.log(vorgangData);
      const deleteResponse = await fetch('http://localhost:8080/statusofdocuments', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vorgangData)
      });

      if (!deleteResponse.ok) {
        throw new Error('Deletion failed');
      }

      const postResponse = await fetch('http://localhost:8080/statusofdocuments', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vorgangData)
      });

      if (!postResponse.ok) {
        throw new Error('Post-operation failed');
      }

    } catch (error) {
      console.error("Error:", error);
      setUploadStatus(error.message);
      setTimeout(() => setUploadStatus(''), 5000);
    }
  };

  return (
    <div id='upload-window'>
      <h2 id='document-upload'>Dokumente hochladen</h2>
      {uploadStatus && <div id='upload-status'>{uploadStatus}</div>}
      <div>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="Upload-documents"
          types={fileTypes}
          label={"Zieh die Dokumente hier hinein"}
          onTypeError={(err) => console.error("Es werden nur pdf und .png Dateien unterstützt")}
          children={<div id='upload'>Dokumente hinein ziehen </div>}
        />
      </div>
    </div>
  )
}

export default DragDrop;