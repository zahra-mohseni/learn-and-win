import axios from "axios";
import styles from "../styles/sign-in.module.css";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import LogContext from "@/context/log-context";
const SignInForm: React.FC<{
  onSignDataGetter: (data: { email: string; password: string }) => void;
  serverError: string;
}> = (props) => {
  const ctx = useContext(LogContext);
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [changer, setChanger] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(true);
    setChanger(!changer);
    props.onSignDataGetter({
      email: email.current!.value,
      password: password.current!.value,
    });
  };
  const logOutHandler = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");

      localStorage.removeItem("score");
      ctx.logOut();
      ctx.closeManager();
      setIsSubmitting(false);
    }
  };
  const signUpHandler = (e: React.FormEvent) => {
    e.preventDefault();
    ctx.toSignUp();
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
        </div>
      ) : (
        <form
          className={`${styles["form-card"]} ${"row mx-auto "}`}
          onSubmit={submitHandler}
        >
          <ul
            className={`${"row d-flex flex-column align-items-center col-lg-5 col-md-6 col-sm-8 col-10"} ${
              styles["un-li"]
            }`}
          >
            <li className=" d-flex flex-column col-md-10 mx-auto col-lg-10 col-sm-10 ">
              {" "}
              <label htmlFor="email">Email</label>
              {submitting && !email.current?.value.includes("@") && (
                <p className={styles.error}>
                  please enter a valid email(include @)
                </p>
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
            {showError && props.serverError.trim().length > 0 && (
              <p className={styles["error-message"]}>{props.serverError}</p>
            )}

            <button
              className={`${"mx-auto col-sm-3 col-md-3 col-3 col-lg-3"} ${
                styles["button"]
              }`}
            >
              sign in
            </button>
            <p className={styles.sign}> did not create an account before ?</p>
            <button
              className={`${"mx-auto col-sm-3 col-md-3 col-3 col-lg-3"} ${
                styles["button"]
              }`}
              onClick={signUpHandler}
            >
              sign up
            </button>
          </ul>
        </form>
      )}
    </>
  );
};
export default SignInForm;
