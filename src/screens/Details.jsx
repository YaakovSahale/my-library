import { useEffect } from "react";
import styles from "../App.module.css";

const Details = ({ bookDetails, setRedirectToDetails }) => {
  useEffect(() => setRedirectToDetails(false), []);

  console.log(bookDetails);
  return (
    <div>
      <h1>Details</h1>
      {bookDetails ? (
        <article key={bookDetails.id}>
          <h3>{bookDetails.volumeInfo.title}</h3>
          <h4>{bookDetails.volumeInfo.authors[0]}</h4>
          <img
            className={styles.bookImg}
            src={bookDetails.volumeInfo.imageLinks?.smallThumbnail}
          />
          <p>{bookDetails.volumeInfo.description}</p>
          <br />
          <br />
        </article>
      ) : null}
    </div>
  );
};

export default Details;
