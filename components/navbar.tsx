import Link from "next/link";

import styles from "../styles/navbar.module.css";
import { useContext, useState } from "react";
import LogContext from "@/context/log-context";
const Navbar = () => {
  const ctx = useContext(LogContext);
  const [logState, setLogState] = useState(false);

  if (typeof window !== "undefined" && window.localStorage) {
    let tok = localStorage.getItem("token");
    let expireTime = localStorage.getItem("expiration");
    if (tok) {
      console.log("token find");
      ctx.logIn();
    }
    if (tok === "659473f4a608560a62f94660") {
      ctx.managing();
    }
  }

  const logHandler = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let token = localStorage.getItem("token");

      if (token) {
        setLogState(false);
        console.log("token exist");
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("score");
        ctx.logOut();
        ctx.closeManager();
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
        <Link className={styles["nav-item"]} href="/quiz-lists">
          Quiz
        </Link>
        <Link className={styles["nav-item"]} href="/authentication">
          sign in/up
        </Link>
        {ctx.manager && (
          <Link className={styles["nav-item"]} href="/manager">
            managing(homepage)
          </Link>
        )}
        {ctx.manager && (
          <Link className={styles["nav-item"]} href="/quiz-manager">
            quiz manager
          </Link>
        )}
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
