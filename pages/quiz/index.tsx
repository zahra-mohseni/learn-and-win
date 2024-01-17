import QuestionCard from "@/components/question-card";
import LogContext from "@/context/log-context";
import { useContext } from "react";
const Quiz: React.FC = () => {
  const ctx = useContext(LogContext);
  const data: {
    question: string;
    options: string[];
    answer: string;
    id: string;
  }[] = [
    {
      question: "Database is an organized collection of related………",
      options: ["Data", "Modules", "Programs", "None of the above"],
      answer: "Data",
      id: "a1",
    },
    {
      question: "How to write the database schema?",
      options: ["HLL", "DML", "DDL", "None of the above"],
      answer: "DDL",
      id: "a2",
    },
    {
      question: "How to write the database schema?",
      options: ["HLL", "DML", "DDL", "None of the above"],
      answer: "DDL",
      id: "a2",
    },
  ];
  if (typeof window !== "undefined" && window.localStorage) {
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
      <QuestionCard data={data} />
    </>
  );
};
export default Quiz;
