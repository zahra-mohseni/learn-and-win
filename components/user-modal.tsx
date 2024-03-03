import { useRef, useState } from "react";
import styles from "../styles/user-modal.module.css";
import axios from "axios";
import { useRouter } from "next/router";
const UserModal = (props: any) => {
  const router = useRouter();
  const username = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(true);
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const textHandler = () => {
    const questUser = {
      score: Number(localStorage.getItem("score")),
      name: username.current!.value,
      test: [props.title],
    };

    axios.post("/api/score-api", questUser).then((response: any) => {
      setIsChanged(!isChanged);
      if (response.status === 200) {
        setIsUserAvailable(true);
        console.log(response);
        setServerMessage(response.data.message);
      } else if (response.status === 201) {
        setIsUserAvailable(false);
        console.log(response);
        setServerMessage(response.data.message);
      }
    });
  };
  const clickHandler = () => {
    props.onDismis(false);
    router.push("/quiz-lists");
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (username.current!.value) {
      const questUser = {
        score: Number(localStorage.getItem("score")),
        name: username.current!.value,
        test: [props.title],
      };
      axios.put("/api/score-api", questUser).then((response: any) => {
        if (response.status === 200) {
          setServerMessage(response.data.message);
        }
      });
    }
    setTimeout(() => {
      router.push("/score-list");
    }, 1500);
  };
  return (
    <div className={styles.back}>
      <form
        className={`${styles.card} ${"row col-lg-6 col-10 mx-auto"}`}
        onSubmit={submitHandler}
      >
        {" "}
        <p className="col-8">
          Dear user : you are not signed in/up . to save your score enter a
          username{" "}
        </p>
        <input
          className={`${styles.input} ${"col-lg-5 col-8"}`}
          ref={username}
          onChange={textHandler}
        />
        {username.current?.value && <p>{serverMessage}</p>}
        <button
          className="col-sm-4 m-1"
          type="submit"
          disabled={isUserAvailable}
        >
          submit
        </button>
        <button className="col-sm-4" onClick={clickHandler}>
          cancle
        </button>
        <p>your score : {props.score}</p>
      </form>
    </div>
  );
};
export default UserModal;
