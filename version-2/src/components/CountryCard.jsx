import { Link } from "react-router-dom";

function CountryCard({ country }) {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="country-card"
    >
      {/* FLAG */}
      <div className="flag-wrapper">
        <img
  className="country-flag"
  src={country.flags?.svg || country.flags?.png}
  alt={`${country.name.common} flag`}
/>
      </div>

      {/* CONTENT */}
      <div className="country-content">
        <h2>{country.name.common}</h2>

        <p>
          Population: {country.population.toLocaleString()}
        </p>

        <p>
          Capital: {country.capital?.[0] || "N/A"}
        </p>

        <p>
          Region: {country.region}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;