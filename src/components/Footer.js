import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-muted text-center">
          &copy; {new Date().getFullYear()} George Sagiannis - MyReads App. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
