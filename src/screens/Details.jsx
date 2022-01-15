import { useEffect, useState } from "react";
import styles from "../App.module.css";

const Details = ({ bookDetails, setRedirectToDetails }) => {
  const [notesState, setNotesState] = useState("");
  useEffect(() => {
    setRedirectToDetails(false);
    setNotesState(bookDetails.userNotes);
  }, []);

  const addUserNotes = (e) => {
    setNotesState(e.target.value);
    const tempReadingList = JSON.parse(localStorage.getItem("readingList"));
    const tempCompletedList = JSON.parse(localStorage.getItem("completedList"));

    tempReadingList.find((book) => {
      if (book.id === bookDetails.id) {
        book.userNotes = e.target.value;
        localStorage.setItem("readingList", JSON.stringify(tempReadingList));
      }
    });

    tempCompletedList.find((book) => {
      if (book.id === bookDetails.id) {
        book.userNotes = e.target.value;
        localStorage.setItem(
          "completedList",
          JSON.stringify(tempCompletedList)
        );
      }
    });
  };

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
          {bookDetails.userNotes ? (
            <textarea
              className={styles.detailTextarea}
              cols="80"
              rows="10"
              value={notesState}
              onChange={(e) => addUserNotes(e)}
            ></textarea>
          ) : null}
        </article>
      ) : null}
    </div>
  );
};

export default Details;
