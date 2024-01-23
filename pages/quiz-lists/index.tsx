import styles from "../../styles/quiz-list.module.css";
import Modal from "@/components/modal";
import { useState } from "react";
const QuizList = () => {
  const [isClicked, setIsClicked] = useState(false);
  const clickHandler = (e: any) => {
    e.preventDefault();
    setIsClicked(true);
  };
  const modalHandler = (data: { data: boolean }) => {
    if (data.data === false) {
      setIsClicked(false);
    }
  };
  return (
    <>
      {" "}
      {isClicked && <Modal onModal={modalHandler} />}
      <div className={`${"row"} ${styles.row}`}>
        <div
          className={`${"col-10 col-lg-4 col-sm-6 col-md-5"} ${styles.cols}`}
          onClick={clickHandler}
        >
          type scrip
        </div>
        <div
          className={`${"col-10 col-lg-4 col-sm-6 col-md-5"} ${styles.cols}`}
        >
          next quiz
        </div>
        <div
          className={`${"col-10 col-lg-4 col-sm-6 col-md-5"} ${styles.cols}`}
        >
          javascript quiz
        </div>
      </div>
    </>
  );
};
export default QuizList;
