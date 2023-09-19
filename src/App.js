import * as BooksAPI from "./BooksAPI";
import React, { useState, useEffect } from "react";
import "./App.css";
import Bookshelf from "./components/Bookshelf";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const bookshelves = [
  { title: "Currently Reading", shelfName: "currentlyReading" },
  { title: "Want to Read", shelfName: "wantToRead" },
  { title: "Read", shelfName: "read" },
];

const App = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BooksAPI.getAll().then((booksFromApi) => {
      setBooks(booksFromApi);
    });
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf, index) => (
              <Bookshelf
                key={index}
                title={bookshelf.title}
                books={
                  books &&
                  books.filter(
                    (book) => book && book.shelf === bookshelf.shelfName
                  )
                }
                setBooks={setBooks}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => navigate("/search")}>Add a book</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  books: PropTypes.array.isRequired,
  setBooks: PropTypes.func.isRequired,
};

export default App;
