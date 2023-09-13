import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import AllPosts from "./components/AllPosts";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/all" element={<AllPosts />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
