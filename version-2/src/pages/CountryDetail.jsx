
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetail({ countriesData }) {
  // Gets the country code from the URL.
  const { countryCode } = useParams();

  // Stores how many times this country has been viewed.
  const [viewCount, setViewCount] = useState(0);

  // Finds the country that matches the URL country code.
  const selectedCountry = countriesData.find((country) => {
    return country.cca3 === countryCode;
  });

  // This keeps the country name from breaking if the data looks different.
  const countryName =
    selectedCountry?.name?.common ||
    selectedCountry?.name ||
    selectedCountry?.country_name ||
    "Unknown Country";

  // When the country page loads, increase the view count one time.
  useEffect(() => {
    if (selectedCountry) {
      updateViewCount();
    }
  }, [selectedCountry]);

  // Sends a POST request to increase this country's view count.
  async function updateViewCount() {
    try {
      const response = await fetch("/api/update-one-country-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_name: countryName,
        }),
      });

      const data = await response.json();

      // The API should send back an object with the new count.
      setViewCount(data.count);
    } catch (error) {
      console.log("Could not update view count:", error);
    }
  }

  // Saves this country to the backend.
 async function saveCountry() {
  try {
    const response = await fetch("/api/save-one-country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country_name: countryName,
      }),
    });

    const data = await response.text();

    console.log("Save country response:", data);

    alert(`${countryName} saved!`);
  } catch (error) {
    console.log("Could not save country:", error);
  }
}

  // If the country is not found, show a simple message.
  if (!selectedCountry) {
    return (
      <main className="detail-page">
        <h1>Country not found</h1>
        <Link to="/" className="back-button">
          Back
        </Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-button">
        Back
      </Link>

      <section className="detail-layout">
        <img
          className="detail-flag"
          src={selectedCountry.flags?.svg || selectedCountry.flags?.png}
          alt={`${countryName} flag`}
        />

        <div className="detail-info">
          <h1>{countryName}</h1>

          <button className="save-button" onClick={saveCountry}>
            Save
          </button>

          <p>Population: {selectedCountry.population?.toLocaleString() || "N/A"}</p>
          <p>Capital: {selectedCountry.capital?.[0] || "N/A"}</p>
          <p>Region: {selectedCountry.region || "N/A"}</p>
          <p>Viewed: {viewCount} times</p>

          <p className="border-title">Bordering countries:</p>

          <div className="border-buttons">
            {selectedCountry.borders?.length > 0 ? (
              selectedCountry.borders.map((borderCode) => (
                <Link
                  key={borderCode}
                  to={`/country/${borderCode}`}
                  className="border-button"
                >
                  {borderCode}
                </Link>
              ))
            ) : (
              <p>No bordering countries</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CountryDetail;