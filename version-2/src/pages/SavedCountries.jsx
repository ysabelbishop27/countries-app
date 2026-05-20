import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  const [user, setUser] = useState(null);
  const [savedCountries, setSavedCountries] = useState([]);

  useEffect(() => {
    getNewestUser();
    getSavedCountries();
  }, []);

  async function getNewestUser() {
    const response = await fetch("/api/get-newest-user");
    const data = await response.json();
    setUser(data);
  }

  async function getSavedCountries() {
    const response = await fetch("/api/get-all-saved-countries");
    const data = await response.json();
    setSavedCountries(data);
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setUser(data);
  }

  return (
    <main className="saved-page">
      {user && <h1>Welcome, {user.name}!</h1>}

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