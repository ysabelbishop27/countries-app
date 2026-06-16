// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// function CountryDetail({ countriesData }) {
//   // Gets the country code from the URL
//   // countryCode would equal "AFG"
//   const { countryCode } = useParams();

//   // Stores the number of times this country page has been viewed
//   const [viewCount, setViewCount] = useState(0);

//   // Finds the country object that matches the country code in the URL
//   const selectedCountry = countriesData.find((country) => {
//     return country.cca3 === countryCode;
//   });

//   // Runs whenever selectedCountry changes
//   // Once the country is found, we increase its view count 
//   useEffect(() => {
//     if (selectedCountry) {
//       updateViewCount();
//     }
//   }, [selectedCountry]);

//   // Sends a POST request to the backend to increase
//   // the number of views for this country
//   async function updateViewCount() {
//     try {
//       const response = await fetch("/api/increment-country-count", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         // Sends country information to the backend
//         body: JSON.stringify({
//           cca3: selectedCountry.cca3,
//           name: selectedCountry.name.common,
//         }),
//       });

//       // Changes the response into JS data
//       const data = await response.json();

//       // Updates the page with the newest count from the backend
//       setViewCount(data.count);
//     } catch (error) {
//       console.log("Could not update view count:", error);
//     }
//   }

//   // Saves the selected country 
//   async function saveCountry() {
//     try {
//       await fetch("/api/save-one-country", {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         // Sends the entire country object to the backend
//         body: JSON.stringify(selectedCountry),
//       });

//       // Lets the user know the country was saved 
//       alert(`${selectedCountry.name.common} saved!`);
//     } catch (error) {
//       console.log("Could not save country:", error);
//     }
//   }

//   // If the country does not exist, show an error message
//   if (!selectedCountry) {
//     return <h1>Country not found</h1>;
//   }

//   return (
//     <main className="detail-page">
//       {/* Back button that returns the user to the Home page */}
//       <Link to="/" className="back-button">
//         Back
//       </Link>

//       <section className="detail-card">
//         {/* Country flag */}
//         <img
//           className="detail-flag"
//           src={
//             selectedCountry.flags?.svg ||
//             selectedCountry.flags?.png
//           }
//           alt={`${selectedCountry.name.common} flag`}
//         />

//         {/* Country information */}
//         <div className="detail-info">
//           {/* Country name */}
//           <h1>{selectedCountry.name.common}</h1>

//           {/* Save country button */}
//           <button onClick={saveCountry}>Save</button>

//           {/* Country details */}
//           <p>
//             Population:{" "}
//             {selectedCountry.population.toLocaleString()}
//           </p>

//           <p>
//             Capital:{" "}
//             {selectedCountry.capital?.[0] || "N/A"}
//           </p>

//           <p>
//             Region: {selectedCountry.region}
//           </p>

//           {/* Shows how many times this page has been viewed */}
//           <p>
//             Viewed: {viewCount} times
//           </p>

//           {/* Border countries section */}
//           <p>
//             Bordering countries:{" "}
//             {selectedCountry.borders?.length
//               ? selectedCountry.borders.join(", ")
//               : "None"}
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default CountryDetail;
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// function CountryDetail({ countriesData }) {
//   const { countryCode } = useParams();
//   const [viewCount, setViewCount] = useState(0);

//   const selectedCountry = countriesData.find(
//     (country) => country.cca3 === countryCode
//   );

//   useEffect(() => {
//     if (selectedCountry) {
//       updateViewCount();
//     }
//   }, [selectedCountry]);

//   async function updateViewCount() {
//     try {
//       const response = await fetch("/api/increment-country-count", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cca3: selectedCountry.cca3,
//           name: selectedCountry.name.common,
//         }),
//       });

//       const data = await response.json();
//       setViewCount(data.count);
//     } catch (error) {
//       console.log("Could not update view count:", error);
//     }
//   }

//   async function saveCountry() {
//     try {
//       await fetch("/api/save-one-country", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(selectedCountry),
//       });

//       alert(`${selectedCountry.name.common} saved!`);
//     } catch (error) {
//       console.log("Could not save country:", error);
//     }
//   }

//   if (!selectedCountry) {
//     return <h1>Country not found</h1>;
//   }

//   return (
//     <main className="detail-page">
//       <Link to="/" className="back-button">
//         Back
//       </Link>

//       <section className="detail-card">
//         <img
//           className="detail-flag"
//           src={selectedCountry.flags?.svg || selectedCountry.flags?.png}
//           alt={`${selectedCountry.name.common} flag`}
//         />

//         <div className="detail-info">
//           <h1>{selectedCountry.name.common}</h1>

//           <button onClick={saveCountry}>Save</button>

//           <p>Population: {selectedCountry.population.toLocaleString()}</p>
//           <p>Capital: {selectedCountry.capital?.[0] || "N/A"}</p>
//           <p>Region: {selectedCountry.region}</p>
//           <p>Viewed: {viewCount} times</p>
//           <p>
//             Bordering countries:{" "}
//             {selectedCountry.borders?.length
//               ? selectedCountry.borders.join(", ")
//               : "None"}
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default CountryDetail;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetail({ countriesData }) {
  // Gets the country code from the URL.
  // Example: /country/AFG means countryCode is "AFG".
  const { countryCode } = useParams();

  // Stores how many times this country has been viewed.
  const [viewCount, setViewCount] = useState(0);

  // Finds the country that matches the URL country code.
  const selectedCountry = countriesData.find((country) => {
    return country.cca3 === countryCode;
  });

  // When the country page loads, increase the view count one time.
  useEffect(() => {
    if (selectedCountry) {
      updateViewCount();
    }
  }, [selectedCountry]);

  // Sends a POST request to increase this country's view count.
  async function updateViewCount() {
    try {
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
        body: JSON.stringify(selectedCountry),
      });

      await response.json();

      alert(`${selectedCountry.name.common} saved!`);
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
          alt={`${selectedCountry.name.common} flag`}
        />

        <div className="detail-info">
          <h1>{selectedCountry.name.common}</h1>

          <button className="save-button" onClick={saveCountry}>
            Save
          </button>

          <p>Population: {selectedCountry.population.toLocaleString()}</p>
          <p>Capital: {selectedCountry.capital?.[0] || "N/A"}</p>
          <p>Region: {selectedCountry.region}</p>
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