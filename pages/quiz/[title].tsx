import QuestionCard from "@/components/question-card";
import LogContext from "@/context/log-context";
import { useContext } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
const Quiz: React.FC = (props: any) => {
  console.log(props.questions);
  const ctx = useContext(LogContext);

  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("score");
    let token = localStorage.getItem("token");
    if (token) {
      let expirationTime = Number(localStorage.getItem("expiration"));
      let presentTime = new Date().getTime();
      if (expirationTime - presentTime < 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        ctx.logOut();
      }
    }
  }
  return (
    <>
      {" "}
      <Head>
        <title>{props.questions[0].title} quiz</title>
        <meta name="description" content="quiz" />
      </Head>
      <QuestionCard data={props.questions} />
    </>
  );
};
export async function getStaticProps(contex: any) {
  const params = contex.params.title;

  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/test-questions?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = await db.collection(params).find().toArray();
  const data = collection[0];
  const arraydata = data.quizData;
  console.log(arraydata);
  let mainData = arraydata.map((member: any) => {
    return {
      title: member.title,
      question: member.question,
      options: member.options,
      answer: member.answer,
      id: member.id,
    };
  });
  return { props: { questions: mainData } };
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/test-questions?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collectionNames = await db.collections();
  const paramsIds = collectionNames.map((item) => ({
    params: { title: item.collectionName },
  }));
  return { fallback: false, paths: paramsIds };
}
export default Quiz;
