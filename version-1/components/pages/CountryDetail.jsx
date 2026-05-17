import { Link, useParams } from "react-router";

function CountryDetail({ countriesData }) {
  const { countryCode } = useParams();

  const selectedCountry = countriesData.find(
    (country) => country.cca3 === countryCode
  );

  if (!selectedCountry) {
    return (
      <main className="detail-page">
        <h1>Country not found</h1>
        <Link to="/">Back Home</Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-button">
        ← Back
      </Link>

      <section className="detail-card">
        <img
          src={selectedCountry.flags.png}
          alt={
            selectedCountry.flags.alt ||
            `${selectedCountry.name.common} flag`
          }
          className="detail-flag"
        />

        <div className="detail-info">
          <h1>{selectedCountry.name.common}</h1>

          <p>
            <span>Population:</span>{" "}
            {selectedCountry.population.toLocaleString()}
          </p>

          <p>
            <span>Region:</span> {selectedCountry.region}
          </p>

          <p>
            <span>Capital:</span>{" "}
            {selectedCountry.capital?.[0] || "N/A"}
          </p>

          <p>
            <span>Country Code:</span> {selectedCountry.cca3}
          </p>
        </div>
      </section>
    </main>
  );
}

export default CountryDetail;