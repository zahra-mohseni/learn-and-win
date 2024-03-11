import styles from "../styles/spiner.module.css";
const Spiner = () => {
  return (
    <div className={styles.back}>
      <div className={`${"d-flex justify-content-center "} ${styles.spiner}`}>
        <div
          className={`${"spinner-border"} ${styles.loader}`}
          role="status"
        ></div>
      </div>
    </div>
  );
};
export default Spiner;
