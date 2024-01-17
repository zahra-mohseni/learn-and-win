import Link from "next/link";

import styles from "../styles/navbar.module.css";
import { useContext, useState } from "react";
import LogContext from "@/context/log-context";
const Navbar = () => {
  const ctx = useContext(LogContext);
  const [logState, setLogState] = useState(false);

  if (typeof window !== "undefined" && window.localStorage) {
    let tok = localStorage.getItem("token");
    if (tok) {
      console.log("token find");
      ctx.logIn();
      console.log("it happend");
    }
  }

  const logHandler = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let token = localStorage.getItem("token");

      if (token) {
        console.log("token exist");
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("score");
        ctx.logOut();
        console.log("token removed");
      }
    }
  };

  return (
    <div className={styles.navbar}>
      <div>
        <Link className={styles["nav-item"]} href="/">
          HomePage
        </Link>
        <Link className={styles["nav-item"]} href="/quiz">
          Quiz
        </Link>
        <Link className={styles["nav-item"]} href="/authentication">
          sign in/up
        </Link>
      </div>{" "}
      <button className={styles.button} onClick={logHandler}>
        {ctx.isLogedIn === false ? (
          <p style={{ margin: 0 }}>quest user</p>
        ) : (
          <p style={{ margin: 0 }}>log out</p>
        )}
      </button>
    </div>
  );
};
export default Navbar;
