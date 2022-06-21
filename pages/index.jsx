import { popularRequest } from "../services/movieRequest";
import FilmList from "../components/FilmList/FilmList";

import styles from "../styles/HomePage.module.css";

const HomePage = ({ filmsData, error }) => {
  return (
    <section>
      <h2 className={styles.home__headline}>Trending today</h2>
      {error && <h3>{error}</h3>}
      {filmsData && <FilmList listData={filmsData} />}
    </section>
  );
};

export default HomePage;

export async function getStaticProps(context) {
  let error = null;
  let filmsData = null;
  try {
    filmsData = await popularRequest().then(({ data }) => data.results);
  } catch (err) {
    error = "something went wrong";
  }

  return {
    props: {
      filmsData,
      error,
    },
  };
}