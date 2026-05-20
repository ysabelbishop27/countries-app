import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryDetail({ countriesData }) {
  const { countryCode } = useParams();
  const [viewCount, setViewCount] = useState(0);

  const selectedCountry = countriesData.find(
    (country) => country.cca3 === countryCode
  );

  useEffect(() => {
    if (selectedCountry) {
      updateViewCount();
    }
  }, [selectedCountry]);

  async function updateViewCount() {
    const response = await fetch("/api/increment-country-count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cca3: selectedCountry.cca3,
        name: selectedCountry.name.common,
      }),
    });

    const data = await response.json();
    setViewCount(data.count);
  }

  async function saveCountry() {
    await fetch("/api/save-one-country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCountry),
    });

    alert(`${selectedCountry.name.common} saved!`);
  }

  if (!selectedCountry) {
    return <h1>Country not found</h1>;
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-button">
        Back
      </Link>

      <section className="detail-card">
        <img
          className="detail-flag"
          src={selectedCountry.flags.png}
          alt={selectedCountry.name.common}
        />

        <div className="detail-info">
          <h1>{selectedCountry.name.common}</h1>

          <button onClick={saveCountry}>Save</button>

          <p>Population: {selectedCountry.population.toLocaleString()}</p>
          <p>Capital: {selectedCountry.capital?.[0] || "N/A"}</p>
          <p>Region: {selectedCountry.region}</p>
          <p>Viewed: {viewCount} times</p>

          <p>
            Bordering countries:{" "}
            {selectedCountry.borders?.length
              ? selectedCountry.borders.join(", ")
              : "None"}
          </p>
        </div>
      </section>
    </main>
  );
}

export default CountryDetail;