import styles from "../App.module.css";
import { FaStar } from "react-icons/fa";

function Star({ filled, onClick }) {
  return (
    <FaStar className={styles.star}
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} />
  );
}
export default Star;