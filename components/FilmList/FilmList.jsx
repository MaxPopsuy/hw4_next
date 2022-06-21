import styles from "./FilmList.module.css";

import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const FilmList = ({ listData }) => {
  return (
    <ul className={styles.trending}>
      {listData &&
        listData.map((item) => (
          <li key={item.id} className={styles.trending__item}>
            {
              <Link href={`/movies/${item.id}`}>
                <a className={styles.trending__link}>{item.title}</a>
              </Link>
            }
          </li>
        ))}
    </ul>
  );
};

export default FilmList;

FilmList.propTypes = {
  listData: PropTypes.array.isRequired,
};