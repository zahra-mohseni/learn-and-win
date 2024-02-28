import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/dropdown.module.css";

const Dropdown: React.FC<{ data: { name: string; link: string }[] }> = (
  props
) => {
  const [showMeno, setShowMeno] = useState(false);
  const router = useRouter();
  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setShowMeno(!showMeno);
  };
  const navClickHandler = (e: any, link: string) => {
    e.preventDefault();
    router.push(link);
    setShowMeno(false);
  };
  return (
    <>
      <button className={styles.button} onClick={clickHandler}>
        Menu
      </button>
      {showMeno && (
        <div className={styles.menu}>
          {props.data.map((item) => (
            <div
              className={styles["nav-self"]}
              onClick={(e) => {
                navClickHandler(e, item.link);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Dropdown;
