import React from "react";
import ReactDOM from "react-dom";

export default function OptionModal(props) {
  return ReactDOM.createPortal(
    <div className="outer-container ">
      <div className="share-container shadow">
        <div className="mt-3">
          <p>{props.content}</p>

          <button
            onClick={() => {
              props.callback(props.id);
              props.toggleModal();
            }}
            className="m-2 btn btn-success"
          >
            {props.btn1}
          </button>
          <button
            onClick={() => {
              props.toggleModal();
            }}
            className=" m-2 btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
