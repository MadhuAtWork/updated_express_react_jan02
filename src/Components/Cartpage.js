import React, { useEffect, useState } from "react";
import { apiUrl } from "../config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import Modalcart from "./Modalcart";

export default function MatserPage() {
  const [image, setImage] = React.useState();
  const [getcartdata, setGetcartdata] = useState([]);
  const [length, setlength] = useState("");

  React.useEffect(() => {
    fetch(`${apiUrl}getImages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const base64 = btoa(data);
        setImage(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleCartMobile = async (e, id) => {
    e.preventDefault();

    try {
      console.log(id);
      const response = await axios.post(`${apiUrl}addcarts`, { _id: id });
      console.log(response.data);
      handlegetcartdata();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handlegetcartdata = async () => {
    const response = await axios.get(`${apiUrl}getcarts`);
    setGetcartdata(response?.data);
    setlength(response?.data?.length);
  };

  useEffect(() => {
    handlegetcartdata();
  }, []);

  const handleBuymobile = () => {};

  return (
    <div>
      <div className="row headerBemzon">
        <div className="container col-4 text-white  ps-5">
          <h2>FlipZon Cart</h2>
        </div>
        <div className="container col-4 text-white  ps-5"></div>
        <div className="container col-4 text-white  ps-5">
          <Modalcart getcartdata={getcartdata} length={length}></Modalcart>
        </div>
      </div>
      <div className=" cartConatiner">
        {image?.map((item, index) => {
          return (
            <div className=" m-2">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  // src={image[index].imgData}
                  src={`data:image/png;base64,${item?.imgData}`}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "12rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Title:{item?.title}</h5>
                  <p className="card-text">{item?.text}</p>
                  <p className="card-text">Price:{item?.price} $</p>
                  <a className="btn btn-primary me-2" onClick={handleBuymobile}>
                    Buy
                  </a>
                  <a
                    className="btn btn-primary"
                    onClick={(e) => handleCartMobile(e, item?._id)}
                  >
                    Cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
