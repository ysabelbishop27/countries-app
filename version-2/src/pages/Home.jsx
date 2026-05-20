import { useState } from "react";
import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  // ================= SEARCH STATE =================
  const [searchText, setSearchText] = useState("");

  // ================= REGION STATE =================
  const [selectedRegion, setSelectedRegion] = useState("");

  // ================= FILTER COUNTRIES =================
  const filteredCountries = countriesData.filter((country) => {
    // Search filter
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchText.toLowerCase());

    // Region filter
    const matchesRegion =
      selectedRegion === ""
        ? true
        : country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <main className="home-page">
      {/* ================= SEARCH + FILTER ================= */}
      <div className="filters-row">
        {/* SEARCH INPUT */}
        <input
          className="search-input"
          type="text"
          placeholder="Search for a country..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        {/* REGION FILTER */}
        <select
          className="region-select"
          value={selectedRegion}
          onChange={(event) => setSelectedRegion(event.target.value)}
        >
          <option value="">Filter by Region</option>

          <option value="Africa">Africa</option>

          <option value="Americas">Americas</option>

          <option value="Asia">Asia</option>

          <option value="Europe">Europe</option>

          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* ================= COUNTRY GRID ================= */}
      <section className="countries-grid">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </section>
    </main>
  );
}
export default Home;