import styles from "../../styles/quiz-list.module.css";
import Modal from "@/components/modal";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useState } from "react";
const QuizList: React.FC<{ data: string[] }> = (props) => {
  const quizTitles = props.data;

  const [isClicked, setIsClicked] = useState(false);
  const [clickedTitle, setClickedTitle] = useState("");
  const clickHandler = (e: any, item: string) => {
    e.preventDefault();
    setClickedTitle(item);
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
      <Head>
        <title>quiz list</title>
        <meta name="description" content="quiz list" />
      </Head>{" "}
      {isClicked && clickedTitle !== "" && (
        <Modal onModal={modalHandler} title={clickedTitle} />
      )}
      <div className={`${"row"} ${styles.row}`}>
        {quizTitles.map((item) => (
          <div
            key={item}
            className={`${"col-10 col-lg-4 col-sm-6 col-md-5"} ${styles.cols}`}
            onClick={(e) => {
              clickHandler(e, item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/test-questions?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collectionNames = await db.collections();

  const names = collectionNames.map((item) => item.collectionName);
  return { props: { data: names } };
}
export default QuizList;
