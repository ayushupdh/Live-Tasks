import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as UserIcon } from "../../icon/user.svg";
import "./ProfileDropDown.css";

const ProfileDropDown = (props) => {
  let node = useRef();

  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    if (open) {
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
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      <div className="profile-circle">
        <div className="item" href="#" onClick={() => setOpen(!open)}>
          <UserIcon className="icon" />
        </div>
      </div>
      {handleMenu()}
    </div>
  );
};

export default ProfileDropDown;
