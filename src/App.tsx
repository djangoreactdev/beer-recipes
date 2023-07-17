import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";

import BeerDetail from "./components/BeerDetail";
import Main from "./components/Main";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/beer/:id" element={<BeerDetail />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
}
