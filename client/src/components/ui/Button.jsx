import React from "react";
export default function Button({ children, ...props }){
  return (
    <button {...props} style={{
      background: "var(--accent)", color:"#fff", border:0, padding:"10px 14px",
      borderRadius:8, cursor:"pointer", fontWeight:600
    }}>{children}</button>
  );
}
