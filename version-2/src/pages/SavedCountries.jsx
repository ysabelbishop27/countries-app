import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries() {
  // Saves  the values the user types into the profile form.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // gets the newest user returned from the backend.
  // If this exists, we show "Welcome, [name]!" on the page.
  const [user, setUser] = useState(null);

  // gets the list of countries the user has saved.
  const [savedCountries, setSavedCountries] = useState([]);

  // Runs once when the Saved Countries page first loads.
  // It gets the newest user and all saved countries from the backend.
  useEffect(() => {
    getNewestUser();
    getSavedCountries();
  }, []);

  // Gets the most recently submitted user profile from the backend.
  async function getNewestUser() {
    try {
      const response = await fetch("/api/get-newest-user");
      const userData = await response.json();

      setUser(userData);
    } catch (error) {
      console.log("Could not get newest user:", error);
    }
  }

  // Gets all saved countries from the backend.
  async function getSavedCountries() {
    try {
      const response = await fetch("/api/get-all-saved-countries");
      const countriesData = await response.json();

      setSavedCountries(countriesData);
    } catch (error) {
      console.log("Could not get saved countries:", error);
    }
  }

  // Updates the correct form field whenever the user types.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [name]: value,
      };
    });
  }

  // Sends the completed profile form to the backend.
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const savedUser = await response.json();

      // Updates the page immediately with the new welcome message.
      setUser(savedUser);
    } catch (error) {
      console.log("Could not save user:", error);
    }
  }

  return (
    <main className="saved-page">
      {/* Shows a welcome message if the backend has a saved user. */}
      {user && <h1>Welcome, {user.name}!</h1>}

      {/* Profile form for saving user information to the backend. */}
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Your Profile</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {/* Saved countries section. */}
      <h2 className="saved-title">Saved Countries</h2>

      <section className="countries-grid">
        {savedCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </section>
    </main>
  );
}

export default SavedCountries;