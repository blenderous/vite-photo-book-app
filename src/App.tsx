// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home'
import UserPhotos from "./components/UserPhotos/UserPhotos";
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/vite-photo-book-app/" element={<Home />} />
        <Route path="/vite-photo-book-app/user-photos/:userId" element={<UserPhotos />} />
      </Routes>
    </div>
  )
}

export default App
