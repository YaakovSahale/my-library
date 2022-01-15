import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "../App.module.css";
import { CgPlayListRemove } from "react-icons/Cg";
import { CgPlayListAdd } from "react-icons/Cg";

const ReadingList = ({
  discoverList,
  setDiscoverList,
  readingList,
  setReadingList,
  completedList,
  setCompletedList,
  redirectToDetails,
  setRedirectToDetails,
  setBookDetails,
}) => {
  useEffect(
    () => setReadingList(JSON.parse(localStorage.getItem("readingList"))),
    []
  );

  const removeFromReadingList = (id) => {
    const tempDiscoverList = [...discoverList];
    const tempReadingList = [...readingList];

    tempDiscoverList.find((book) => {
      if (book.id === id) book.isReading = false;
    });

    const bookIndex = tempReadingList.findIndex((book) => book.id === id);
    tempReadingList.splice(bookIndex, 1);

    setReadingList(tempReadingList);
    setDiscoverList(tempDiscoverList);
    localStorage.setItem("readingList", JSON.stringify(tempReadingList));
  };

  const addToCompletedList = (id) => {
    removeFromReadingList(id);
    const tempCompletedList = JSON.parse(localStorage.getItem("completedList"))
      ? JSON.parse(localStorage.getItem("completedList"))
      : [];
    discoverList.find((book) => {
      if (book.id === id) tempCompletedList.push(book);
    });
    setCompletedList(tempCompletedList);
    localStorage.setItem("completedList", JSON.stringify(tempCompletedList));
  };
  // background-color: #e3be80;
  return (
    <div className={styles.readingPage}>
      <section className={styles.readingTab}>
      <h1 className={styles.pageTitle}>Reading List</h1>
        {readingList
          ? readingList.map((book) => (
              <article key={book.id}>
                <h3>{book.volumeInfo.title}</h3>
                <h4>{book.volumeInfo.authors[0]}</h4>
                <img
                  className={styles.bookImg}
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  onClick={() => {
                    setBookDetails(book);
                    setRedirectToDetails(true);
                  }}
                />
                <p>{book.volumeInfo.description.slice(0, 400)}...</p>

                <CgPlayListRemove
                  className={styles.actionBtn}
                  onClick={() => removeFromReadingList(book.id)}
                />
                <CgPlayListAdd
                  className={styles.actionBtn}
                  onClick={() => addToCompletedList(book.id)}
                />
                <hr />
              </article>
            ))
          : null}
      </section>
      {redirectToDetails ? <Redirect to={"/Details"} /> : null}
    </div>
  );
};

export default ReadingList;
