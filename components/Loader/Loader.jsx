import React from "react";
import { Oval } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Oval height="100" width="100" color="#7858A6" arialLabel="Loading..." />
    </div>
  );
};

export default Loader;