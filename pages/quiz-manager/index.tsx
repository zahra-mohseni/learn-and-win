import { FormEvent, useState, useRef } from "react";
import styles from "../../styles/quiz-manager.module.css";
const QuizManager = () => {
  const [quizArray, setQuizArray] = useState<
    {
      question: string;
      options: string[];
      answer: string;
      id: string;
    }[]
  >([]);
  const question = useRef<HTMLInputElement>(null);
  const option1 = useRef<HTMLInputElement>(null);
  const option2 = useRef<HTMLInputElement>(null);
  const option3 = useRef<HTMLInputElement>(null);
  const option4 = useRef<HTMLInputElement>(null);
  const answer = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  const addHandler = (e: any) => {
    e.preventDefault();
    console.log("first");
    if (
      question.current?.value !== null &&
      option1.current?.value !== null &&
      option2.current?.value !== null &&
      option3.current?.value !== null &&
      option4.current?.value !== null &&
      answer.current?.value !== null
    ) {
      const data = [
        {
          question: question.current!.value,
          options: [
            option1.current!.value,
            option2.current!.value,
            option3.current!.value,
            option4.current!.value,
          ],
          answer: answer.current!.value,
          id: Math.random().toString(),
        },
      ];
      setQuizArray((prev) => prev!.concat(data));
    }
  };
  console.log(quizArray);
  return (
    <>
      {" "}
      <form className={`${styles.form} ${"mx-auto"}`} onSubmit={submitHandler}>
        <ul className={`${"mx-auto"} ${styles.ul}`}>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              htmlFor="question"
              style={{ marginRight: 10, color: "#fff1f1;" }}
            >
              question :
            </label>
            <input
              ref={question}
              id="question"
              placeholder="type the question here"
              className="col-lg-5 col-md-6 col-sm-8 col-8"
            />
          </li>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              style={{ marginRight: 10, color: "#fff1f1;" }}
              htmlFor="answer1"
            >
              option 1
            </label>
            <input
              ref={option1}
              id="answer1"
              placeholder="type first answer here"
              className="col-lg-3 col-md-4 col-sm-5 col-7"
            />
          </li>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              style={{ marginRight: 10, color: "#fff1f1;" }}
              htmlFor="answer2"
            >
              option 2
            </label>
            <input
              ref={option2}
              id="answer2"
              placeholder="type secound answer here"
              className="col-lg-3 col-md-4 col-sm-5 col-7"
            />
          </li>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              style={{ marginRight: 10, color: "#fff1f1;" }}
              htmlFor="answer3"
            >
              option 3
            </label>
            <input
              ref={option3}
              id="answer3"
              placeholder="type third answer here"
              className="col-lg-3 col-md-4 col-sm-5 col-7"
            />
          </li>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              style={{ marginRight: 10, color: "#fff1f1;" }}
              htmlFor="answer4"
            >
              option 4
            </label>
            <input
              ref={option4}
              id="answer4"
              placeholder="type forth answer here"
              className="col-lg-3 col-md-4 col-sm-5 col-7"
            />
          </li>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              style={{ marginRight: 10, color: "#fff1f1;" }}
              htmlFor="answer4"
            >
              answer :{" "}
            </label>
            <input
              ref={answer}
              id="answer"
              placeholder="answer"
              className="col-lg-3 col-md-4 col-sm-5 col-7"
            />
          </li>
          <button onClick={addHandler}>add</button>
        </ul>
      </form>
    </>
  );
};
export default QuizManager;
