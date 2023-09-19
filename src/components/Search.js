import * as BooksAPI from "../BooksAPI";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./Book";

import Header from "./Header";
import Footer from "./Footer";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const updateResultsWithShelves = (resultsArray, myBooks) => {
    return resultsArray.map((result) => {
      const matchingItem = myBooks.find((myBook) => myBook.id === result.id);
      const shelf = matchingItem ? matchingItem.shelf : "none";
      return { ...result, shelf };
    });
  };

  useEffect(() => {
    const handleSearchTermChange = (event) => {
      const newSearchTerm = event ? event.target.value : searchTerm;

      if (newSearchTerm.length === 0) {
        setSearchResults([]);
        return;
      }

      BooksAPI.search(newSearchTerm).then((searchResult) => {
        if (Array.isArray(searchResult)) {
          BooksAPI.getAll().then((myBooks) => {
            const booksWithShelves = updateResultsWithShelves(
              searchResult,
              myBooks
            );
            setSearchResults(booksWithShelves);
          });
        } else {
          setSearchResults([]);
        }
      });
    };

    handleSearchTermChange();

    return () => {};
  }, [searchTerm]);

  return (
    <div className="search-container">
      <Header />
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => navigate("/")}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book, index) => (
              <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                imageUrl={book.imageLinks?.thumbnail}
                bookshelf={book.shelf}
                book={book}
                isSearching
              />
            ))}
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
