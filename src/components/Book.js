import React from "react";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

const Book = (props) => {
  const { title, authors, imageUrl, book, setBooks, isSearching, bookshelf } =
    props;

  const updateBookShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks((books) => {
        return [...books.filter((b) => b.id !== book.id), book];
      });
    });
  };

  const handleShelfChange = (event) => {
    const newShelf = event.target.value;
    if (newShelf !== "move") {
      updateBookShelf(book, newShelf);
    }
  };

  const handleShelfChangeInSearch = (event) => {
    const newShelf = event.target.value;
    if (newShelf !== "move") {
      updateBookShelf(book, newShelf);
    }
  };

  const shelves = [
    {
      id: "1",
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading",
    },
    { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
    { id: "3", shelfName: "read", shelfDisplayName: "Read" },
    { id: "4", shelfName: "none", shelfDisplayName: "None" },
  ];

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageUrl}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(event) => {
              if (!isSearching) {
                handleShelfChange(event);
              } else {
                handleShelfChangeInSearch(event);
              }
            }}
            defaultValue={bookshelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            {shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.shelfName}>
                {shelf.shelfDisplayName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.map((author) => `${author},`)}
      </div>
    </div>
  );
};

// Set a default prop for setBooks
Book.defaultProps = {
  setBooks: () => {}, // Provide a default empty function
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  book: PropTypes.object.isRequired,
  setBooks: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
  bookshelf: PropTypes.string,
};

export default Book;
