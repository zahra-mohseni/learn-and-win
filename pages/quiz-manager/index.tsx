import { FormEvent, useState, useRef, useEffect } from "react";
import styles from "../../styles/quiz-manager.module.css";
import QuestionShow from "@/components/question-show";
import axios from "axios";
const QuizManager = () => {
  const [quizArray, setQuizArray] = useState<
    {
      question: string;
      options: string[];
      answer: string;
      id: string;
    }[]
  >([]);
  const title = useRef<HTMLInputElement>(null);
  const question = useRef<HTMLInputElement>(null);
  const option1 = useRef<HTMLInputElement>(null);
  const option2 = useRef<HTMLInputElement>(null);
  const option3 = useRef<HTMLInputElement>(null);
  const option4 = useRef<HTMLInputElement>(null);
  const answer = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put("api/data-api", {
        quizArray,
        title: title.current?.value,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("response");
          alert(response.data.message);
        } else if (response.status === 201) {
          alert(response.data.message);
        }
      });
    question.current!.value = "";
    option1.current!.value = "";
    option2.current!.value = "";
    option3.current!.value = "";
    option4.current!.value = "";
    answer.current!.value = "";
    title.current!.value = "";
  };
  const addHandler = (e: any) => {
    e.preventDefault();

    if (
      question.current?.value &&
      option1.current?.value &&
      option2.current?.value &&
      option3.current?.value &&
      option4.current?.value &&
      answer.current?.value &&
      title.current?.value
    ) {
      const data = [
        {
          title: title.current!.value,
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
    question.current!.value = "";
    option1.current!.value = "";
    option2.current!.value = "";
    option3.current!.value = "";
    option4.current!.value = "";
    answer.current!.value = "";
  };
  console.log(quizArray);
  const deleteHandler = (data: any) => {
    console.log(data);
    if (data.order === true) {
      setQuizArray((prev) => prev.filter((item) => item.id !== data.id));
    }
  };

  return (
    <>
      {" "}
      <form
        className={`${styles.form} ${"mx-auto col-10"}`}
        onSubmit={submitHandler}
      >
        <ul className={`${"mx-auto col-12"} ${styles.ul}`}>
          <div
            style={{
              marginBottom: 38,
              borderRadius: 4,
              backgroundColor: "darkgrey",
              padding: 15,
            }}
          >
            <label style={{ marginRight: 10, color: "black" }} htmlFor="title">
              quiz title
            </label>
            <input
              ref={title}
              id="title"
              placeholder="please enter the quiz title here"
            />
          </div>
          <li className={`${styles.li} ${"col-12 mx-auto"}`}>
            <label
              htmlFor="question"
              style={{ marginRight: 10, color: "black" }}
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
              style={{ marginRight: 10, color: "black" }}
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
              style={{ marginRight: 10, color: "black" }}
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
              style={{ marginRight: 10, color: "black" }}
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
              style={{ marginRight: 10, color: "black" }}
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
              style={{ marginRight: 10, color: "black" }}
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
          <button onClick={addHandler}>add question to list</button>
          {quizArray.map((item, index) => (
            <QuestionShow
              key={item.id}
              data={item}
              onDelete={deleteHandler}
              index={index}
            />
          ))}

          <button
            type="submit"
            style={{ marginBottom: 50, marginTop: 10 }}
            disabled={quizArray.length === 0 ? true : false}
          >
            finish and submit
          </button>
        </ul>
      </form>
    </>
  );
};
export default QuizManager;
