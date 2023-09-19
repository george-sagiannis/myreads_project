import React from "react";
import * as BooksAPI from "../BooksAPI";

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
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
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

export default Book;
