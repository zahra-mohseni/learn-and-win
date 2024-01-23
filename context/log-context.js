import { useState } from "react";
import { createContext } from "react";
const LogContext = createContext({
  isLogedIn: false,
  signMode: "sign-up",
  logIn: () => {},
  logOut: () => {},
  toSignIn: () => {},
  toSignUp: () => {},
  managing: () => {},
  manager: false,
  closeManager: () => {},
});
export function LogContextProvider(props) {
  const [signMode, setSignMode] = useState("sign-up");
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const context = {
    isLogedIn: isLogedIn,
    managing,
    logIn,
    logOut,
    signMode: signMode,
    toSignIn,
    toSignUp,
    manager: isManager,
    closeManager,
  };
  function closeManager() {
    setIsManager(false);
  }
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
  function managing() {
    setIsManager(true);
  }
  return (
    <LogContext.Provider value={context}>{props.children}</LogContext.Provider>
  );
}
export default LogContext;
