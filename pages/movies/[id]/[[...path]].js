import { NextSeo } from "next-seo";
import { useState} from "react";
import { pageRequest } from "../../../services/movieRequest";
import { useRouter } from "next/router";

import defaultImage from "../../../img/no-photo.png";

import Loader from "../../../components/Loader/Loader";
import Cast from "../../../components/Cast/Cast";
import Reviews from "../../../components/Reviews/Reviews";
import NavLink from "../../../components/NavLink/NavLink";

import styles from "../../../styles/MovieDetailPage.module.css";


export default function MovieDetailsPage({ requestData, dataError }) {
  const { query, back } = useRouter();

  const [movieData, setMovieData] = useState(requestData || null);
  const [error, setError] = useState(dataError || "");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className={styles.movie}>
      <NextSeo title={requestData.title || "Hmm, movie not found"}></NextSeo>
      <button onClick={() => back()} className={styles.movies__btn} type="button">
        {"<- Go back"}
      </button>
      {isLoading && <Loader />}
      {error && <h2>{error}</h2>}
      {!error && movieData && (
        <>
          <div className={styles.movie__contentWrapper}>
            <img
              width={300}
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
                  : defaultImage
              }
              alt=""
              className={styles.movie__img}
            />
            <div className={styles.movie__textWrapper}>
              <h2 className={styles.movie__headline}>{movieData.title}</h2>
              <p className={styles.movie__text}>User score: {movieData.vote_average * 10 }%</p>
              <h3 className={styles.movie__caption}>Overview</h3>
              <p className={styles.movie__text}>{movieData.overview}</p>
              <h3 className={styles.movie__caption}>Genres:</h3>
              <p className={styles.movie__text}>
                {movieData.genres.map((item) => (
                  <span key={item.id}> {item.name} </span>
                ))}
              </p>
            </div>
          </div>
          <NavLink
            activeClass={styles.movie__linkActive}
            classes={styles.movie__link}
            href={`/movies/${query.id}/reviews`}
          >
            Reviews
          </NavLink>
          <NavLink
            activeClass={styles.movie__linkActive}
            classes={styles.movie__link}
            href={`/movies/${query.id}/cast`}
          >
            Cast
          </NavLink>
          {query?.path && query.path[0] === "cast" && <Cast movieId={query.id} />}
          {query?.path && query.path[0] === "reviews" && <Reviews movieId={query.id} />}
        </>
      )}
    </section>
  );
}


export async function getServerSideProps({ params }) {
  let dataError = null;
  let requestData = null;
  try {
    requestData = await pageRequest(params.id).then(({ data }) => data);

  } catch (err) {
    dataError = "something went wrong";
  }
  return {
    props: {
      requestData,
      dataError,
    },
  };
}