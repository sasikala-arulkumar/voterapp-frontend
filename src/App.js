// App.js
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterVoter from "./pages/RegisterVoter";
import AllVoters from "./pages/AllVoters";
import { useState, Fragment } from "react";
import "./App.css";

function App() {
  const [voters, setVoters] = useState([]);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterVoter voters={voters} setVoters={setVoters} />} />
          <Route path="/voters" element={<AllVoters voters={voters} setVoters={setVoters} />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
