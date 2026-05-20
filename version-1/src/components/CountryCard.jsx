import { Link } from "react-router";

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`} className="country-card">
      <img
        src={country.flags.png}
        alt={country.flags.alt || `${country.name.common} flag`}
        className="country-flag"
      />

      <div className="country-content">
        <h2>{country.name.common}</h2>

        <p>
          <span>Population:</span> {country.population.toLocaleString()}
        </p>

        <p>
          <span>Region:</span> {country.region}
        </p>

        <p>
          <span>Capital:</span> {country.capital?.[0] || "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;