import { Routes, Route } from "react-router-dom";
import React, { useState, createContext } from "react";

import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import Games from "./components/AllGames";
import Categories from "./components/AllCategories";
import Category from "./components/Category";
import Game from "./components/Game";
import Post from "./components/Post";


function App() {
  return (
    <div className="App">
      
      <NavBar/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Games />} />
        <Route path="/category/" element={<Categories />} />
        <Route path="/" element={<Games />} />
        <Route path="/category/:categoryid/games" element={<Category />} />
        <Route path="/category/:categoryid/games/:gameid"  element={<Game />} />
        <Route path="/games/:gameid"  element={<Game />} />
        <Route path="/category/:categoryid/games/:gameid/posts/:postid"  element={<Post />} />
        <Route path="/games/:gameid/posts/:postid"  element={<Post />} />
      </Routes>
     
      
      

    </div>
  );
}

export default App;
