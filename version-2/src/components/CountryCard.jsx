

import { Link } from "react-router-dom";

function CountryCard({ country }) {
  const countryCode = country.cca3 || country.country_code || country.code || "";
  const countryName =
    country.name?.common ||
    country.name ||
    country.country_name ||
    country.saved_country_name ||
    "Unknown Country";

  const flag =
    country.flags?.svg ||
    country.flags?.png ||
    country.flag ||
    country.flag_url ||
    "";

  const population = country.population
    ? country.population.toLocaleString()
    : "N/A";

  const capital = country.capital?.[0] || country.capital || "N/A";

  const region = country.region || "N/A";

  return (
    <Link to={`/country/${countryCode}`} className="country-card">
      {flag && (
        <img
          className="country-flag"
          src={flag}
          alt={`${countryName} flag`}
        />
      )}

      <div className="country-card-info">
        <h2>{countryName}</h2>
        <p>Population: {population}</p>
        <p>Capital: {capital}</p>
        <p>Region: {region}</p>
      </div>
    </Link>
  );
}

export default CountryCard;
