import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { apiUrl } from "../config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  overflow: "scroll",
  height: "80vh",
};

export default function ModalDelete({ getcartdata, length }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Badge badgeContent={length} color="secondary">
        <ShoppingCartIcon
          sx={{ fontSize: 40, color: "black" }}
          onClick={handleOpen}
        ></ShoppingCartIcon>
      </Badge>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row">
            <div className="col-12 addcartmodalheader">Cart Details</div>
          </div>
          {getcartdata?.map((item, index) => {
            return (
              <div className="m-2">
                <div className="row">
                  <div className="col-4 text-center">
                    <img
                      src={`data:image/png;base64,${item?.imgData}`}
                      className="card-img-top"
                      alt="..."
                      style={{ height: "8rem", width: "8rem" }}
                    />
                  </div>
                  <div className="col-4">
                    <h5 className="card-title">Title:{item?.title}</h5>
                    <p className="card-text">{item?.text}</p>
                    <p className="card-text">Price:{item?.price} $</p>
                  </div>
                  <div className="col-4">
                    <div
                      className="btn btn-primary m-2"
                      //   onClick={(e) => handleDelete(e, item?._id)}
                    >
                      Buy
                    </div>
                    <br></br>
                    <div
                      className="btn btn-primary m-2"
                      //   onClick={(e) => handleDelete(e, item?._id)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
