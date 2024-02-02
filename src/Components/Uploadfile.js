import React, { useState } from "react";
import { apiUrl } from "../config";

import axois from "axios";

export default function UploadFilePage() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [uploadUrl, setUploadUrl] = useState();

  const [title, setTitle] = useState("");
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const [price, setPrice] = useState("");
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const fileExtension = selectedFile.name.split(".").pop();
    if (["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("File format not supported");
    }
  };

  const handleUpload = async () => {
    console.log(file);

    if (!file) {
      console.error("No file selected.");
      return;
    }
    // const imagedata = uploadUrl;
    const imagedata = new FormData();
    imagedata.append("image", file);
    imagedata.append("title", title);
    imagedata.append("price", price);
    // console.log(imagedata[1]);
    try {
      const response = await axois.post(`${apiUrl}upload`, imagedata);
      console.log(response);
      alert(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mastermain container">
      <nav className="navbar navbar-dark subHeader">
        <div className="container-fluid text-white">
          <h2>Upload Files</h2>
        </div>
      </nav>
      <div className="container">
        <div className="row m-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Upload Images</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleTitle}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handlePrice}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ms-5 mt-1">
        <button type="submit" className="btn btn-primary">
          Back
        </button>
      </div>
    </div>
  );
}
