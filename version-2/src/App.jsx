
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import SavedCountries from "./pages/SavedCountries";
import localData from "./localData";

function App() {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3,borders"
      );

      const data = await response.json();

      const sortedCountries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountriesData(sortedCountries);
    } catch (error) {
      console.log("Could not get countries:", error);
      setCountriesData(localData);

    }
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-title">
          Where in the world?
        </Link>

        <Link to="/saved-countries" className="saved-link">
          Saved Countries
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home countriesData={countriesData} />} />

        <Route
          path="/country/:countryCode"
          element={<CountryDetail countriesData={countriesData} />}
        />

        <Route
          path="/saved-countries"
          element={<SavedCountries countriesData={countriesData} />}
        />
      </Routes>
    </>
  );
}

export default App;