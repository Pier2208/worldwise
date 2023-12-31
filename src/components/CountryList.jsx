import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

export default function CountryList() {
  const { isLoading, cities } = useCities()
  
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // given an array of objects, only keep unique objects
  const countries = [
    ...new Set(
      cities.map((city) =>
        JSON.stringify({ country: city.country, emoji: city.emoji })
      )
    ),
  ].map((country) => JSON.parse(country));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
