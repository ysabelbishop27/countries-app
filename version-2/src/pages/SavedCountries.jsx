
import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries({ countriesData }) {
  // Saves the values the user types into the profile form.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // Stores the newest user returned from the backend.
  const [user, setUser] = useState(null);

  // Stores all countries saved in the backend.
  const [savedCountries, setSavedCountries] = useState([]);

  // Runs once when the Saved Countries page loads.
  useEffect(() => {
    getNewestUser();
    getSavedCountries();
  }, []);

  // Gets the most recently submitted user profile.
  async function getNewestUser() {
    try {
      const response = await fetch("/api/get-newest-user");
      const data = await response.json();

      setUser(data.user || data);
    } catch (error) {
      console.log("Could not get newest user:", error);
    }
  }

  // Gets all saved countries from the backend.
  async function getSavedCountries() {
    try {
      const response = await fetch("/api/get-all-saved-countries");
      const data = await response.json();

      setSavedCountries(data.savedCountries || data);
    } catch (error) {
      console.log("Could not get saved countries:", error);
    }
  }

  // Updates the correct form field when the user types.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [name]: value,
      };
    });
  }

  // Sends the profile form data to the backend.
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/add-one-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          country_name: formData.country,
          bio: formData.bio,
        }),
      });

      const data = await response.text();

      console.log("Save user response:", data);

      if (!response.ok) {
        console.log("Something went wrong:", data);
        return;
      }

      // Updates the welcome message right away.
      setUser({
        name: formData.name,
        email: formData.email,
        country_name: formData.country,
        bio: formData.bio,
      });

      // Clears the form after submitting.
      setFormData({
        name: "",
        email: "",
        country: "",
        bio: "",
      });
    } catch (error) {
      console.log("Could not save user:", error);
    }
  }

  return (
    <main className="saved-page">
      <h1 className="saved-page-title">My Saved Countries</h1>

      <section className="countries-grid">
        {savedCountries.length > 0 ? (
          savedCountries.map((country, index) => (
            <CountryCard
              key={
                country.saved_country_id ||
                country.id ||
                country.country_id ||
                country.cca3 ||
                country.name?.common ||
                `${country.name || "country"}-${index}`
              }
              country={country}
            />
          ))
        ) : (
          <p>No saved countries yet.</p>
        )}
      </section>

      {user?.name && (
        <h1 className="welcome-message">Welcome back, {user.name}!</h1>
      )}

      <h2 className="profile-title">My Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Country</option>

          {countriesData.map((country) => (
            <option key={country.cca3} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default SavedCountries;