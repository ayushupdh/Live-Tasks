import React, { useState } from "react";
import { ReactComponent as UserIcon } from "../../icon/user.svg";
import "./ProfileDropDown.css";

const ProfileDropDown = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="profile-circle">
        <div className="item" href="#" onClick={() => setOpen(!open)}>
          <UserIcon className="icon" />
        </div>
      </div>
      {open && props.children}
    </div>
  );
};

export default ProfileDropDown;
