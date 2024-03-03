import { useRouter } from "next/router";
import FormItem from "../../components/form";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useContext } from "react";
import LogContext from "@/context/log-context";
import SignInForm from "@/components/sign-in";

const Authentication = () => {
  const ctx = useContext(LogContext);

  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const params = searchParams?.get("mode");
  console.log(params);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    score: number;
  }>();
  const [token, setToken] = useState<string>("");

  const router = useRouter();
  const dataGether = async (data: {
    name: string;
    email: string;
    password: string;
    score: number;
  }) => {
    axios.post("/api/pj-api", data).then((response) => {
      if (response.status === 200) {
        ctx.logIn();
        let user = response.data.responsedData;
        let userToken = response.data.token;
        setUser(user);
        setToken(userToken);
        localStorage.setItem("token", user?.id);

        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        localStorage.setItem("expiration", expirationTime.getTime().toString());
        localStorage.setItem("score", user.score);
        router.push("/");
      } else if (response.status === 202) {
        let error = response.data.message;
        alert(error);
      } else if (response.status === 203) {
        setSignUpError(response.data.message);
      }
    });
  };
  let signMode = ctx.signMode;
  const SignDataHandler = async (data: { email: string; password: string }) => {
    axios.put("/api/pj-api", data).then((response) => {
      console.log(response);
      if (response.status === 203) {
        console.log("succsses");
        let message = response.data.message;
        let userData = response.data.data;

        console.log(userData);
        let signToken = userData.id;
        setToken(signToken);
        setUser(userData);
        setServerError("");
        ctx.logIn();
        localStorage.setItem("token", userData.id);
        localStorage.setItem("score", userData.score);
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        localStorage.setItem("expiration", expirationTime.getTime().toString());
        if (userData.id === "659473f4a608560a62f94660") {
          ctx.managing();
        }
      } else if (response.status === 206) {
        let message = response.data.message;
        setServerError(message);
        console.log(message);
      }
    });
  };
  return (
    <>
      <Head>
        <title>authentication</title>
        <meta name="description" content="authentication page" />
      </Head>
      {signMode === "sign-up" ? (
        <FormItem onDataGetter={dataGether} signError = {signUpError} />
      ) : (
        <SignInForm
          onSignDataGetter={SignDataHandler}
          serverError={serverError}
        />
      )}
    </>
  );
};

export default Authentication;
