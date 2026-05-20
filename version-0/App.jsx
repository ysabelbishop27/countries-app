import "./App.css";
import { Routes, Route, Link } from "react-router";

import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";

import dataFromLocalFile from "./localData.js";

function App() {
  return (
    <div className="app">
      
      <header className="header">
        <Link className="logo" to="/">
          Where in the world?
        </Link>

        <Link className="saved-link" to="/saved">
          Saved Countries
        </Link>
      </header>

      
      <Routes>
        <Route
          path="/"
          element={<Home countriesData={dataFromLocalFile} />}
        />

        <Route path="/saved" element={<SavedCountries />} />

        <Route path="/country/:countryName" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;