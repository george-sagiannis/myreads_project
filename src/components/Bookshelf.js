import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const Bookshelf = ({ books, title, setBooks }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book) => (
              <li key={book.id}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  imageUrl={book.imageLinks?.thumbnail}
                  bookshelf={book.shelf}
                  book={book}
                  setBooks={setBooks}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  setBooks: PropTypes.func.isRequired,
};

export default Bookshelf;
