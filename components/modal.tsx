import styles from "../styles/modal.module.css";
import { useRouter } from "next/router";
const ModalPage = (props: any) => {
  const router = useRouter();
  const submitHandler = (e: any) => {
    e.preventDefault();
    router.push("/quiz");
  };
  const cancelHandler = (e: any) => {
    e.preventDefault();
    router.push("/");
  };
  const discardHandler = (e: any) => {
    e.preventDefault();
    props.onModal({ data: false });
  };
  return (
    <div onClick={discardHandler} className={`${styles.back}`}>
      <div className={`${styles.card} ${"col-lg-6 mx-auto "}`}>
        {" "}
        <p style={{ fontSize: 18 }}>did you studied typescript ?</p>
        <button className={`${styles.button}`} onClick={submitHandler}>
          yes i want to start quiz
        </button>
        <button className={`${styles.button}`} onClick={cancelHandler}>
          no i want to study first
        </button>
      </div>
    </div>
  );
};
export default ModalPage;
