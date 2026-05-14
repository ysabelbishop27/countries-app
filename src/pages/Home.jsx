import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  return (
    <main className="home-page">
      
      <div className="home-top">
        <h1>Where in the world?</h1>

        <button className="search-button">Search Countries</button>
      </div>

      
      <section className="countries-grid">
        {countriesData.map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              country={country}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Home;