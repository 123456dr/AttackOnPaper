import React from "react";
import "../css/DialogBox.css"; // 保留原樣式

function ModalDialog({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="dialog" onClick={onClose}>
      <div className="dialogtxt" onClick={(e) => e.stopPropagation()} style={{position:"relative"}}>
        {children}
        <button onClick={onClose} style={{position:"absolute",right:"5px",bottom:"5px"}}>OK</button>
        <button onClick={() => alert("HAHA! 影片轉換還沒build done")} style={{position:"absolute",right:"45px",bottom:"5px"}}>Cancel</button>
      </div>
    </div>
  );
}

export default ModalDialog;
