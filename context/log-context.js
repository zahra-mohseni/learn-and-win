import { useState } from "react";
import { createContext } from "react";
const LogContext = createContext({
  isLogedIn: false,
  signMode: "sign-up",
  logIn: () => {},
  logOut: () => {},
  toSignIn: () => {},
  toSignUp: () => {},
});
export function LogContextProvider(props) {
  const [signMode, setSignMode] = useState("sign-up");
  const [isLogedIn, setIsLogedIn] = useState(false);
  const context = {
    isLogedIn: isLogedIn,
    logIn,
    logOut,
    signMode: signMode,
    toSignIn,
    toSignUp,
  };
  function logIn() {
    setIsLogedIn(true);
  }
  function logOut() {
    setIsLogedIn(false);
  }
  function toSignIn() {
    setSignMode("sign-in");
  }
  function toSignUp() {
    setSignMode("sign-up");
  }
  return (
    <LogContext.Provider value={context}>{props.children}</LogContext.Provider>
  );
}
export default LogContext;
