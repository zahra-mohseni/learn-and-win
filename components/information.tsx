import React from "react";
import styles from "../styles/information.module.css";
import { useRouter } from "next/router";
const Information: React.FC<{
  itemData: { image: string; title: string; text: string };
}> = (props) => {
  const router = useRouter();
  const clickHandler = (e: any) => {
    e.preventDefault();

    router.push(`/data/${props.itemData.title}`);
  };
  return (
    <div className="row ">
      <div
        className={`${"col-lg-7 col-md-10 col-sm-10 col-11 mx-auto d-flex flex-column align-items-center"} ${
          styles.back
        }`}
      >
        {" "}
        <img
          className={`${"col-8 col-md-6 col-lg-6 "} ${styles.imgs}`}
          src={props.itemData.image}
        />
        <h5>{props.itemData.title}</h5>
        <div style={{ overflow: "clip", height: 100 }}>
          {" "}
          {props.itemData.text}
        </div>
        <button onClick={clickHandler} className={styles.button}>
          read more...
        </button>
      </div>
    </div>
  );
};
export default Information;
