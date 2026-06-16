// import { useEffect, useState } from "react";
// import CountryCard from "../components/CountryCard";

// function SavedCountries() {
//   // Saves  the values the user types into the profile form.
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     country: "",
//     bio: "",
//   });

//   // gets the newest user returned from the backend.
//   // If this exists, we show "Welcome, [name]!" on the page.
//   const [user, setUser] = useState(null);

//   // gets the list of countries the user has saved.
//   const [savedCountries, setSavedCountries] = useState([]);

//   // Runs once when the Saved Countries page first loads.
//   // It gets the newest user and all saved countries from the backend.
//   useEffect(() => {
//     getNewestUser();
//     getSavedCountries();
//   }, []);

//   // Gets the most recently submitted user profile from the backend.
//   async function getNewestUser() {
//     try {
//       const response = await fetch("/api/get-newest-user");
//       const userData = await response.json();

//       setUser(userData);
//     } catch (error) {
//       console.log("Could not get newest user:", error);
//     }
//   }

//   // Gets all saved countries from the backend.
//   async function getSavedCountries() {
//     try {
//       const response = await fetch("/api/get-all-saved-countries");
//       const countriesData = await response.json();

//       setSavedCountries(countriesData);
//     } catch (error) {
//       console.log("Could not get saved countries:", error);
//     }
//   }

//   // Updates the correct form field whenever the user types.
//   function handleChange(event) {
//     const { name, value } = event.target;

//     setFormData((previousFormData) => {
//       return {
//         ...previousFormData,
//         [name]: value,
//       };
//     });
//   }

//   // Sends the completed profile form to the backend.
//   async function handleSubmit(event) {
//     event.preventDefault();

//     try {
//       const response = await fetch("/api/save-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const savedUser = await response.json();

//       // Updates the page immediately with the new welcome message.
//       setUser(savedUser);
//     } catch (error) {
//       console.log("Could not save user:", error);
//     }
//   }

//   return (
//     <main className="saved-page">
//       {/* Shows a welcome message if the backend has a saved user. */}
//       {user && <h1>Welcome, {user.name}!</h1>}

//       {/* Profile form for saving user information to the backend. */}
//       <form className="profile-form" onSubmit={handleSubmit}>
//         <h2>Your Profile</h2>

//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           name="country"
//           placeholder="Country"
//           value={formData.country}
//           onChange={handleChange}
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           value={formData.bio}
//           onChange={handleChange}
//         />

//         <button type="submit">Submit</button>
//       </form>

//       {/* Saved countries section. */}
//       <h2 className="saved-title">Saved Countries</h2>

//       <section className="countries-grid">
//         {savedCountries.map((country) => (
//           <CountryCard key={country.cca3} country={country} />
//         ))}
//       </section>
//     </main>
//   );
// }

// export default SavedCountries;

// import { useEffect, useState } from "react";
// // import CountryCard from "../components/CountryCard";

// function SavedCountries() {
//   // Stores the information the user types into the form.
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     country: "",
//     bio: "",
//   });

//   // Stores the newest user from the backend.
//   const [user, setUser] = useState(null);

//   // We are commenting this out for now because the saved countries section
//   // is likely what is breaking the page.
//   // const [savedCountries, setSavedCountries] = useState([]);

//   useEffect(() => {
//     getNewestUser();

//     // Commented out for now while fixing the form/user API first.
//     // getSavedCountries();
//   }, []);

//   async function getNewestUser() {
//     try {
//       const response = await fetch("/api/get-newest-user");
//       const userData = await response.json();

//       console.log("Newest user response:", userData);

//       // The API response is an array, so we need the first item.
//       setUser(userData[0]);
//     } catch (error) {
//       console.log("Could not get newest user:", error);
//     }
//   }

//   // Commented out for now because this part is breaking the page.
//   // async function getSavedCountries() {
//   //   try {
//   //     const response = await fetch("/api/get-all-saved-countries");
//   //     const countriesData = await response.json();
//   //     setSavedCountries(countriesData);
//   //   } catch (error) {
//   //     console.log("Could not get saved countries:", error);
//   //   }
//   // }

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setFormData((previousFormData) => ({
//       ...previousFormData,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     try {
//       const response = await fetch("/api/add-one-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         // The backend expects the user information inside a "user" key.
//         body: JSON.stringify({
//           user: {
//             name: formData.name,
//             email: formData.email,
//             country: formData.country,
//             bio: formData.bio,
//           },
//         }),
//       });

//       const savedUserResponse = await response.json();

//       console.log("Saved user response:", savedUserResponse);

//       // If the response is an array, use the first item.
//       // If it is an object, use the object directly.
//       setUser(Array.isArray(savedUserResponse) ? savedUserResponse[0] : savedUserResponse);
//     } catch (error) {
//       console.log("Could not save user:", error);
//     }
//   }

//   return (
//     <main className="saved-page">
//       {user && <h1>Welcome, {user.name}!</h1>}

//       <form className="profile-form" onSubmit={handleSubmit}>
//         <h2>Your Profile</h2>

//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           name="country"
//           placeholder="Country"
//           value={formData.country}
//           onChange={handleChange}
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           value={formData.bio}
//           onChange={handleChange}
//         />

//         <button type="submit">Submit</button>
//       </form>

      
//       {/* <h2 className="saved-title">Saved Countries</h2>

//       <section className="countries-grid">
//         {savedCountries.map((country) => (
//           <CountryCard key={country.cca3} country={country} />
//         ))}
//       </section> */}
//     </main>
//   );
// }

// export default SavedCountries;

// import { useEffect, useState } from "react";
// // import CountryCard from "../components/CountryCard";

// function SavedCountries() {
//   const [formData, setFormData] = useState({
//     user_name: "",
//     user_email: "",
//     user_country: "",
//     user_bio: "",
//   });

//   const [user, setUser] = useState(null);

//   // Instructor note:
//   // I commented out the saved countries section for now because it was breaking the page.
//   // I am fixing the user form API first before adding the saved countries cards back in.
//   // const [savedCountries, setSavedCountries] = useState([]);

//   useEffect(() => {
//     getNewestUser();

//     // getSavedCountries();
//   }, []);

//   async function getNewestUser() {
//     try {
//       const response = await fetch("/api/get-newest-user");
//       const userData = await response.json();

//       console.log("Newest user response:", userData);

//       // The API gives back an array, so I need to access the first object.
//       setUser(userData[0]);
//     } catch (error) {
//       console.log("Could not get newest user:", error);
//     }
//   }

//   async function getSavedCountries() {
//     try {
//       const response = await fetch("/api/get-all-saved-countries");
//       const countriesData = await response.json();
//       setSavedCountries(countriesData);
//     } catch (error) {
//       console.log("Could not get saved countries:", error);
//     }
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setFormData((previousFormData) => ({
//       ...previousFormData,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     try {
//       const response = await fetch("/api/add-one-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         // The backend expects these exact key names.
//         body: JSON.stringify({
//           user_name: formData.user_name,
//           user_email: formData.user_email,
//           user_country: formData.user_country,
//           user_bio: formData.user_bio,
//         }),
//       });

//       const savedUser = await response.json();

//       console.log("Saved user response:", savedUser);

//       setUser(Array.isArray(savedUser) ? savedUser[0] : savedUser);
//     } catch (error) {
//       console.log("Could not save user:", error);
//     }
//   }

//   return (
//     <main className="saved-page">
//       {user && <h1>Welcome, {user.user_name}!</h1>}

//       <form className="profile-form" onSubmit={handleSubmit}>
//         <h2>Your Profile</h2>

//         <input
//           name="user_name"
//           placeholder="Name"
//           value={formData.user_name}
//           onChange={handleChange}
//         />

//         <input
//           name="user_email"
//           placeholder="Email"
//           value={formData.user_email}
//           onChange={handleChange}
//         />

//         <input
//           name="user_country"
//           placeholder="Country"
//           value={formData.user_country}
//           onChange={handleChange}
//         />

//         <textarea
//           name="user_bio"
//           placeholder="Bio"
//           value={formData.user_bio}
//           onChange={handleChange}
//         />

//         <button type="submit">Submit</button>
//       </form>

//       {/* Instructor note:
//           I commented this section out because it was breaking the page.
//           After the user form is working correctly, I will add saved countries back in.
//       */}

//       {/* <h2 className="saved-title">Saved Countries</h2>

//       <section className="countries-grid">
//         {savedCountries.map((country) => (
//           <CountryCard key={country.cca3} country={country} />
//         ))}
//       </section> */}
//     </main>
//   );
// }

// export default SavedCountries;

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
      const response = await fetch("/api/get-newest-user")
      const data = await response.json();

      // Some APIs return the user directly.
      // Some return it inside another key.
      setUser(data.user || data);
    } catch (error) {
      console.log("Could not get newest user:", error);
    }
  }

  // Gets all saved countries from the backend.
  async function getSavedCountries() {
    try {
      const response = await fetch("/api/get-all-saved-countries")
      const data = await response.json();

      // Some APIs return an array directly.
      // Some return the array inside a key like savedCountries.
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
      const response = await fetch("/api/add-one-user",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Updates the welcome message right away.
      setUser(data.user || data);

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
          savedCountries.map((country) => (
            <CountryCard key={country.cca3 || country.name?.common} country={country} />
          ))
        ) : (
          <p>No saved countries yet.</p>
        )}
      </section>

      {user?.name && <h1 className="welcome-message">Welcome back, {user.name}!</h1>}

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