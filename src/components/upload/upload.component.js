import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import "./upload.component.css";

export default function Upload(props) {
  const [fileName, setFileName] = useState("");

  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = e => {
      props.onHandleFiles(reader.result);
    };
    reader.readAsText(files[0]);
    setFileName(files[0].name);
  };

  return (
    <div>
      <div className="input-group mb-3">
        <div className="custom-file">
          <ReactFileReader handleFiles={handleFiles} fileTypes={".csv,.xml"}>
            <label className="custom-file-label">{fileName}</label>
          </ReactFileReader>
        </div>
      </div>
    </div>
  );
}
