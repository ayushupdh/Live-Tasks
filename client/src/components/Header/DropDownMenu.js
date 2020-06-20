import React from "react";

export default function DropDownMenu(props) {
  console.log(props);
  return (
    <div className="dropdown">
      {props.user && (
        <div href="#" className="menu-item text-white ">
          {props.user.name}
        </div>
      )}
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
