import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const ToastComponent = ({ showToasty, msg, color, onHide }) => {
  const [showToast, setToast] = useState(showToasty);
  return (
    <div style={{ margin: "10px" }}>
      <Toast
        style={{ float: "right" }}
        onClose={() => {
          setToast(false);
          onHide();
        }}
        autohide
        show={showToast}
        delay={2200}
      >
        <Toast.Body style={{ color: color, fontWeight: 500, fontSize: "16px" }}>
          {msg}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastComponent;
