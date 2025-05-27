import React from "react";
import '../styles/layout.css'

function Layout({ children }) {
    
  return <div className="appBackground">{children}</div>;
}

export default Layout;
