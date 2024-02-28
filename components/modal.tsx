import styles from "../styles/modal.module.css";
import { useRouter } from "next/router";
const ModalPage = (props: any) => {
  const router = useRouter();
  const submitHandler = (e: any) => {
    e.preventDefault();
    router.push(`/quiz/${props.title}`);
  };
  const cancelHandler = (e: any, title: string) => {
    e.preventDefault();
    router.push(`/data/${title}`);
  };
  const discardHandler = (e: any) => {
    e.preventDefault();
    props.onModal({ data: false });
  };
  return (
    <div onClick={discardHandler} className={`${styles.back}`}>
      <div className={`${styles.card} ${"col-lg-6 mx-auto col-8"}`}>
        {" "}
        <p style={{ fontSize: 18 }}>did you studied {props.title} ?</p>
        <button className={`${styles.button}`} onClick={submitHandler}>
          YES ,I want to start quiz
        </button>
        <button
          className={`${styles.button}`}
          onClick={(e) => {
            cancelHandler(e, props.title);
          }}
        >
          NO ,I want to study first
        </button>
      </div>
    </div>
  );
};
export default ModalPage;
