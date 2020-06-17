import React from "react";

export default function DropDownMenu(props) {
  return (
    <div className="dropdown">
      <div href="#" className="menu-item text-white ">
        Profile
      </div>
      <div
        href="#"
        className="menu-item text-white "
        onClick={() => props.signoutUser()}
      >
        Logout
      </div>
    </div>
  );
}
