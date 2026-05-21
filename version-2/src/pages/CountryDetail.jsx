import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryDetail({ countriesData }) {
  // Gets the country code from the URL
  // countryCode would equal "AFG"
  const { countryCode } = useParams();

  // Stores the number of times this country page has been viewed
  const [viewCount, setViewCount] = useState(0);

  // Finds the country object that matches the country code in the URL
  const selectedCountry = countriesData.find((country) => {
    return country.cca3 === countryCode;
  });

  // Runs whenever selectedCountry changes
  // Once the country is found, we increase its view count 
  useEffect(() => {
    if (selectedCountry) {
      updateViewCount();
    }
  }, [selectedCountry]);

  // Sends a POST request to the backend to increase
  // the number of views for this country
  async function updateViewCount() {
    try {
      const response = await fetch("/api/increment-country-count", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Sends country information to the backend
        body: JSON.stringify({
          cca3: selectedCountry.cca3,
          name: selectedCountry.name.common,
        }),
      });

      // Changes the response into JS data
      const data = await response.json();

      // Updates the page with the newest count from the backend
      setViewCount(data.count);
    } catch (error) {
      console.log("Could not update view count:", error);
    }
  }

  // Saves the selected country 
  async function saveCountry() {
    try {
      await fetch("/api/save-one-country", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Sends the entire country object to the backend
        body: JSON.stringify(selectedCountry),
      });

      // Lets the user know the country was saved 
      alert(`${selectedCountry.name.common} saved!`);
    } catch (error) {
      console.log("Could not save country:", error);
    }
  }

  // If the country does not exist, show an error message
  if (!selectedCountry) {
    return <h1>Country not found</h1>;
  }

  return (
    <main className="detail-page">
      {/* Back button that returns the user to the Home page */}
      <Link to="/" className="back-button">
        Back
      </Link>

      <section className="detail-card">
        {/* Country flag */}
        <img
          className="detail-flag"
          src={
            selectedCountry.flags?.svg ||
            selectedCountry.flags?.png
          }
          alt={`${selectedCountry.name.common} flag`}
        />

        {/* Country information */}
        <div className="detail-info">
          {/* Country name */}
          <h1>{selectedCountry.name.common}</h1>

          {/* Save country button */}
          <button onClick={saveCountry}>Save</button>

          {/* Country details */}
          <p>
            Population:{" "}
            {selectedCountry.population.toLocaleString()}
          </p>

          <p>
            Capital:{" "}
            {selectedCountry.capital?.[0] || "N/A"}
          </p>

          <p>
            Region: {selectedCountry.region}
          </p>

          {/* Shows how many times this page has been viewed */}
          <p>
            Viewed: {viewCount} times
          </p>

          {/* Border countries section */}
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