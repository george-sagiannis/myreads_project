import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Search from "./components/Search";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={<App books={[]} setBooks={() => {}} />} // i passed books and setBooks props here!!!
      />
      <Route path="/search" element={<Search />} />
    </Routes>
  </Router>
);
