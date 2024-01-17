import { useRouter } from "next/router";
import styles from "../../styles/manager.module.css";
import { FormEvent, useRef } from "react";
import axios from "axios";
const InformationEntering = () => {
  const router = useRouter();
  const imgLink = useRef<HTMLInputElement>(null);
  const dataTitle = useRef<HTMLInputElement>(null);
  const formText = useRef<HTMLTextAreaElement>(null);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    let image = imgLink.current?.value;
    let title = dataTitle.current?.value;
    let text = formText.current?.value;
    if (
      image?.trim().length !== 0 &&
      title?.trim().length !== 0 &&
      text?.trim().length !== 0
    ) {
      const response = await axios.post("api/data-api", { image, title, text });
      if (response.status === 200) {
        imgLink.current!.value = "";
        dataTitle.current!.value = "";
        formText.current!.value = "";
        router.push("/");
      } else if (response.status === 201) {
        console.log(response.data.message);
      }
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`${
        styles.form
      } ${"col-lg-7 col-md-8 col-sm-9 col-10 mx-auto"}`}
    >
      <ul className={`${"col-12 "} ${styles.ul}`}>
        <li className={`${styles.li} ${"col-12"}`}>
          <label htmlFor="img-url" style={{ color: "#ddd7d7" }}>
            {" "}
            image link :
          </label>
          <input
            id="img-url"
            className=" col-md-10 col-lg-9 col-12"
            ref={imgLink}
          />
        </li>
        <li className={`${styles.li} ${"col-12"}`}>
          <label htmlFor="title" style={{ color: "#ddd7d7" }}>
            title :{" "}
          </label>
          <input
            id="title"
            className=" col-md-10 col-lg-9 col-12"
            ref={dataTitle}
          />
        </li>
        <li className={`${styles.li} ${"col-12"}`}>
          <label htmlFor="data" style={{ color: "#ddd7d7" }}>
            data :{" "}
          </label>
          <textarea
            ref={formText}
            id="data"
            className=" col-md-10 col-lg-9 col-12 "
            style={{ height: 500 }}
          />
        </li>
        <button type="submit" style={{ margin: 9 }}>
          submit
        </button>
      </ul>
    </form>
  );
};
export default InformationEntering;
