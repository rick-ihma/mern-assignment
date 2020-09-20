import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import "./upload.css";
import { parse } from "papaparse";

export default function Upload(props) {
  const [fileName, setFileName] = useState("");

  const handleFiles = files => {
    var reader = new FileReader();
    reader.onload = e => {
      const resultWithHeader = parse(reader.result, {
        header: true,
        skipEmptyLines: true
      });
      const result = parse(reader.result, {
        skipEmptyLines: true
      });
      props.onHandleFiles(resultWithHeader, result);
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
