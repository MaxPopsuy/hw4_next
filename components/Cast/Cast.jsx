import React, { useState, useEffect } from "react";
import { castRequest } from "../../services/movieRequest";
import defaultImage from "../../img/no-photo.png";
import Loader from "../Loader/Loader";
import styles from "./Cast.module.css";

export default function Cast({ movieId}) {
  const [castData, setCastData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    castRequest(movieId)
      .then(({ data }) => {
        setCastData(data.cast);
        setError("");
      })
      .catch((error) => setError("Opps, something went wrong"))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <section className={styles.cast}>
      {isLoading && <Loader />}
      {error && !isLoading && <h2>{error}</h2>}
      {castData.length === 0 && <h2>We will add cast soon</h2>}
      {!error &&
        castData.length > 0 &&
        castData.map((item) => (
          <div key={item.id} className={styles.cast__wrapper}>
            <img
              className={styles.cast__image}
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                  : defaultImage.src
              }
              alt={item.name}
            />
            <h3 className={styles.cast__name}>{item.name}</h3>
          </div>
        ))}
    </section>
  );
}