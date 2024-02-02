import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const mainmenuList = location.state;

  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <div className="homeContainer">
      <div className="conatiner">
        <div className="row align-items-start  header sticky-top p-1">
          <div className="col-3 text-white">
            <h2>Chota.TCS.Infosys.Wipro@Tech</h2>
          </div>
          {mainmenuList?.map((value, index) => {
            return (
              <div className="col column text-center pt-2" key={index}>
                <Link to={value.path} state={mainmenuList}>
                  <p>{value.menu}</p>
                </Link>
              </div>
            );
          })}
          <div
            className="col-3 text-end text-white pt-2"
            onClick={handleLogout}
          >
            Sign out
          </div>
        </div>
        <div class="row align-items-center sectionMain">
          <div className="section m-2">
            <Outlet></Outlet>
          </div>
        </div>
        <div class="row align-items-end footer fixed-bottom">
          <div class="col text-center p-3">
            <span>
              ©2023 Chota.TCS.Infosys.Wipro@ Software & Solutions Pvt. Ltd. |
              All rights reserved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
