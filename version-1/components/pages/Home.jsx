import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  return (
    <main className="home-page">
      <section className="countries-grid">
        {countriesData.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </section>
    </main>
  );
}

export default Home;