import { useState } from "react";

function SavedCountries({ countriesData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted profile:", formData);
  }

  return (
    <main className="saved-page">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h1>Save Your Profile</h1>

        <label>
          Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Country
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select a country</option>

            {countriesData.map((country) => (
              <option key={country.cca3} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default SavedCountries;