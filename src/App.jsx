import React, { useState } from "react";
import "./App.css";
import { Input, Button } from "@material-ui/core";
import axios from "axios";
import ProgressBar from "./Components/ProgressBar";
import { uploadFile } from "./api/api";

function App() {
  let [file, setFile] = useState(null);
  let [progress, setProgress] = useState(0);
  let [fileUploaded, setFileUploaded] = useState(false);

  const fileUploadProgress = async (e) => {
    let prog = (e.loaded / e.total) * 100;
    setProgress(prog);
    if (prog === 100) {
      setFileUploaded(true);
      setTimeout(() => {
        setProgress(0);
        setFile(null);
        setFileUploaded(false);
      }, 3000);
    }
  };

  const uploadFileToServer = async () => {
    await uploadFile(file, fileUploadProgress);
  };

  return (
    <>
      <div className="main__container">
        <div className="app__container">
          <div className="input__heading">
            <h1>File Upload Progress</h1>
          </div>
          <div>
            <input
              id="img"
              style={{ display: "" }}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
          </div>
          <div>{file ? "File Selected" : "No File selected"}</div>
        </div>
        <div className="button__container">
          <Button
            onClick={uploadFileToServer}
            variant="outlined"
            type="primary"
            disabled={!file}
          >
            Upload File
          </Button>
        </div>
        <div className="file__progress__bar">
          <div className="file__success">
            <p>{fileUploaded ? "File Uploaded Successfully" : ""}</p>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>
    </>
  );
}

export default App;
