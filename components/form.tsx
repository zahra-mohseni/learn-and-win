import axios from "axios";
import styles from "../styles/form.module.css";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import LogContext from "@/context/log-context";
const FormItem: React.FC<{
  onDataGetter: (data: {
    name: string;
    email: string;
    password: string;
    score: number;
  }) => void;
}> = (props) => {
  const ctx = useContext(LogContext);
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [changer, setChanger] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("sign-up");
  const searchParams = useSearchParams();
  const params = searchParams?.get("mode");

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setChanger(!changer);
    props.onDataGetter({
      name: name.current!.value,
      email: email.current!.value,
      password: password.current!.value,
      score: 0,
    });
  };
  const logOutHandler = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");

      localStorage.removeItem("score");
      ctx.logOut();
    }
  };
  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    ctx.toSignIn();
  };
  return (
    <>
      {ctx.isLogedIn === true ? (
        <div
          className={`${
            styles.welcome
          } ${" col-lg-8 col-md-9 col-sm-10 col-11 mx-auto"}`}
        >
          <p style={{ fontWeight: "bold" }}>wellcome zahra to quiz games</p>
          <p>to log out and sign in with another acconnt press log out key</p>
          <button onClick={logOutHandler} style={{ borderRadius: 8 }}>
            log out
          </button>
          {}
        </div>
      ) : (
        <form
          className={`${styles["form-card"]} ${"row mx-auto "}`}
          onSubmit={submitHandler}
        >
          <ul
            className={`${"row d-flex flex-column col-lg-5 col-md-6 col-sm-8 col-10"} ${
              styles["un-li"]
            }`}
          >
            <li className=" d-flex flex-column col-md-10 mx-auto col-lg-10 col-sm-10 ">
              {" "}
              <label htmlFor="name">Name</label>
              {submitting && name.current?.value === "" && (
                <p className={styles.error}>please enter your name</p>
              )}
              <input
                ref={name}
                type="text"
                id="name"
                placeholder="please enter your name"
              />
            </li>

            <li className=" d-flex flex-column col-md-10 mx-auto col-lg-10 col-sm-10 ">
              {" "}
              <label htmlFor="email">Email</label>
              {!email.current?.value.includes("@") && submitting && (
                <p className={styles.error}>please a valid email(include @)</p>
              )}
              <input
                ref={email}
                id="email"
                type="email"
                placeholder="please enter you email address"
              />
            </li>
            <li className=" d-flex flex-column col-md-10 mx-auto col-lg-10 col-sm-10 ">
              {" "}
              <label htmlFor="password">Password</label>
              {password.current &&
                password.current!.value.trim().length < 6 &&
                submitting && (
                  <p className={styles.error}>
                    your password should be at least 6 caracters{" "}
                  </p>
                )}
              <input
                ref={password}
                type="password"
                id="password"
                placeholder="please enter your password"
              />
            </li>
            <button
              className={`${"mx-auto col-sm-3 col-md-3 col-3 col-lg-3"} ${
                styles["button"]
              }`}
            >
              sign up
            </button>
            <p className={styles.sign}>already have an account ?</p>
            <button
              className={`${"mx-auto col-sm-3 col-md-3 col-3 col-lg-3"} ${
                styles["button"]
              }`}
              onClick={signInHandler}
            >
              sign in
            </button>
          </ul>
        </form>
      )}
    </>
  );
};
export default FormItem;
