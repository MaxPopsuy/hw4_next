import React, { useState, useEffect } from "react";
import { reviewsRequest } from "../../services/movieRequest";
import Loader from "../Loader/Loader";

import styles from "./Reviews.module.css";

export default function Reviews({ movieId }) {
  const [reviewsData, setReviewsData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    reviewsRequest(movieId)
      .then(({ data }) => {
        setReviewsData(data.results);
        setError("");
      })
      .catch(() => setError("Opps, something went wrong"))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <section className={styles.reviews}>
      {isLoading && <Loader />}
      {error && !isLoading && <h2>{error}</h2>}
      {reviewsData.length === 0 && <h2>No reviews yet</h2>}
      {!error &&
        reviewsData.length > 0 &&
        reviewsData.map((item) => (
          <div key={item.id} className={styles.reviews__wrapper}>
            <h3 className={styles.reviews__author}>{item.author}</h3>
            <span className={styles.reviews__date}>{parseInt(item.created_at)}</span>
            <p className={styles.reviews__text}>{item.content}</p>
          </div>
        ))}
    </section>
  );
}