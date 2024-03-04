import LogContext from "@/context/log-context";
import styles from "../styles/question-card.module.css";
import { useRouter } from "next/router";

import React, { FC, useContext, useState } from "react";
import axios from "axios";
import UserModal from "./user-modal";
const QuestionCard: React.FC<{
  data: {
    question: string;
    options: string[];
    answer: string;
    id: string;
    title: string;
  }[];
}> = (props) => {
  const mainData = props.data;
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [finished, setIsFinished] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let x = 0;
  let quest = mainData[itemIndex];
  const dataLength = mainData.length;
  const selectHandler = async (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    setIsClicked(true);

    if (name === quest.answer) {
      setScore((prev) => prev + 1);
      console.log("answer is correct");
    } else {
      console.log("false");
    }
  };
  const dataSwicher = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClicked(false);
    if (itemIndex === dataLength - 2) {
      setIsFinished(true);
    }
    if (itemIndex < dataLength - 1) {
      setItemIndex((prev) => prev + 1);
    } else {
      let scoreNumber = score + Number(localStorage.getItem("score"));
      localStorage.setItem("score", scoreNumber.toString());
      let user = {
        score: scoreNumber,
        token: localStorage.getItem("token"),
      };
      axios.patch("/api/pj-api", user).then((response) => {
        if (response.status === 207) {
          setShowModal(true);
        }
        if (response.status === 208) {
          router.push("/score-list");
        }
      });
    }
  };
  const dismisHandler = (data: boolean) => {
    setShowModal(data);
  };
  return (
    <>
      {showModal && (
        <UserModal onDismis={dismisHandler} title={quest.title} score={score} />
      )}
      <form
        className={`${
          styles["card-container"]
        } ${"row col-11 col-lg-8 d-flex flex-column align-items-center mx-auto"}`}
      >
        <div className={`${styles["qustion-card"]} ${"row col-10 display-1"}`}>
          {quest.question}
        </div>
        <div className={`${styles["button-box"]} ${"row col-12 "}`}>
          <div
            className={`${
              styles["button-container"]
            } ${"row col-12 d-flex flex-row align-items-center"}`}
          >
            {" "}
            <button
              style={{
                backgroundColor:
                  isClicked && quest.answer === quest.options[0] ? "green" : "",
              }}
              id={quest.options[0]}
              className={`${styles.button} ${"col-md-5 col-sm-5 col-lg-5 "}`}
              onClick={(e) => {
                selectHandler(e, quest.options[0]);
              }}
              disabled={isClicked ? true : false}
            >
              {quest.options[0]}
            </button>
            <button
              style={{
                backgroundColor:
                  isClicked && quest.answer === quest.options[1] ? "green" : "",
              }}
              id={quest.options[1]}
              className={`${styles.button} ${"col-md-5 col-sm-5 col-lg-5"}`}
              onClick={(e) => {
                selectHandler(e, quest.options[1]);
              }}
              disabled={isClicked ? true : false}
            >
              {" "}
              {quest.options[1]}
            </button>
          </div>
          <div
            className={`${
              styles["button-container"]
            } ${"row d-flex flex-row align-items-center"}`}
          >
            <button
              style={{
                backgroundColor:
                  isClicked && quest.answer === quest.options[2] ? "green" : "",
              }}
              id={quest.options[2]}
              className={`${styles.button} ${"col-md-5 col-sm-5 col-lg-5"}`}
              onClick={(e) => {
                selectHandler(e, quest.options[2]);
              }}
              disabled={isClicked ? true : false}
            >
              {" "}
              {quest.options[2]}
            </button>
            <button
              style={{
                backgroundColor:
                  isClicked && quest.answer === quest.options[3] ? "green" : "",
              }}
              id={quest.options[3]}
              className={`${styles.button} ${"col-md-5 col-sm-5 col-lg-5"}`}
              onClick={(e) => {
                selectHandler(e, quest.options[3]);
              }}
              disabled={isClicked ? true : false}
            >
              {" "}
              {quest.options[3]}
            </button>
          </div>
        </div>
        <div className="container d-flex flex-column align-items-center">
          <button className={styles["next-button"]} onClick={dataSwicher}>
            {finished ? (
              <p style={{ margin: 0 }}>submit</p>
            ) : (
              <p style={{ margin: 0 }}>next question</p>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default QuestionCard;
