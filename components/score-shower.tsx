import styles from "../styles/score-shower.module.css";
function Score(props: {
  data: { name: string; score: number; testsNumber: number }[];
}) {
  const data = props.data;
  console.log(data);

  return (
    <div className={`${styles.back} ${"row col-10 col-lg-8 mx-auto"}`}>
      <div className={` ${styles.table} ${" row col-12"} `}>
        <div className={` ${styles.table} ${"row col-12 "} `}>
          {" "}
          <div className={` ${"col-4 "} ${styles.texts} `}>Name </div>
          <div className={` ${"col-4 "} ${styles.texts} `}>passed tests </div>
          <div className={` ${"col-4 "} ${styles.texts} `}>Score </div>
        </div>
        {data.map((item) => {
          return (
            <div
              key={item.name}
              className={` ${styles.table} ${"row col-12"} `}
            >
              <div className={` ${"col-4 "} ${styles.texts} `}>{item.name}</div>
              <div className={` ${"col-4 "} ${styles.texts} `}>
                {item.testsNumber}
              </div>{" "}
              <div className={` ${"col-4 "} ${styles.texts} `}>
                {item.score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Score;
