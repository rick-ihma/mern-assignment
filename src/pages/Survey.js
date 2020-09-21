import React, { useState } from "react";
import Upload from "../components/upload/upload";
import Axios from "axios";
import { useSelector } from "react-redux";

export default function Customers() {
  const initialData = [];
  const [data, setData] = useState();
  const [header, setHeader] = useState([]);
  const [dataHeader, setDataHeader] = useState();
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: ""
  });
  const currentUser = useSelector(state => state.currentUser);

  const UploadFile = (fileHeader, file) => {
    const header = file.data.splice(0, 1).flat();
    setDataHeader(fileHeader.data);
    setData(file.data);
    setHeader(header);
  };

  async function submit() {
    try {
      await Axios.post(
        `http://localhost:5000/users/${currentUser.user._id}/customers/add`,
        { data: dataHeader },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token")
          }
        }
      );
      setDataHeader(initialData);
      setData(initialData);
      setHeader(initialData);
      setAlert({
        isVisible: true,
        message: "Upload Success!",
        type: "alert-success"
      });
      setTimeout(
        () => setAlert({ isVisible: false, message: "", type: "" }),
        3000
      );
    } catch (e) {
      setAlert({
        isVisible: true,
        message: "Error something is wrong",
        type: "alert-danger"
      });
      setTimeout(
        () => setAlert({ isVisible: false, message: "", type: "" }),
        3000
      );
    }
  }

  return (
    <div className="container mt-5">
      {alert.isVisible ? (
        <div className={`alert ${alert.type}`}>
          <strong>{alert.message}</strong>
        </div>
      ) : (
        ""
      )}
      <h3>Import CSV File</h3>
      <p>Upload file</p>
      <Upload onHandleFiles={UploadFile} />
      <div className="container">
        <div className="row">
          {header.map((head, indexHead) => {
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
          })}
        </div>
        {data ? (
          <div className="row">
            <div className="col-sm text-right mt-5">
              <button
                onClick={submit}
                type="submit"
                className="btn btn-primary text-right"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
