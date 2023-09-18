import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="list-books-title">
      <a href="/" className="anchor-link">
        <h1 className="header-title">MyReads</h1>
      </a>
      <button
        className="header-button header-style-text"
        onClick={() => navigate("/search")}
      >
        Add a book
      </button>
    </header>
  );
};

export default Header;
