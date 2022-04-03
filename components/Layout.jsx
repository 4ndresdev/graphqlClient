import React from "react";

// Import Components
import Nav from "../components/Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
