import React, { useState } from "react";
import Upload from "../components/upload/upload";

export default function Customers() {
  const [data, setData] = useState();
  const [header, setHeader] = useState([]);

  const UploadFile = file => {
    const header = file.data.splice(0, 1).flat();
    setData(file.data);
    setHeader(header);
  };

  return (
    <div className="container mt-5">
      <h3>Import CSV File</h3>
      <p>Upload file</p>
      <Upload onHandleFiles={UploadFile} />
      <div className="container">
        <div className="row">
          {header.map((head, indexHead) => {
            if (head) {
              return (
                <div className="col-sm mt-5" key={indexHead}>
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title text-center">{head}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      {data.map((value, indexValue) => {
                        return (
                          <li className="list-group-item" key={indexValue}>
                            {value[indexHead]}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
