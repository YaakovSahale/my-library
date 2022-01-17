import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import styles from "../App.module.css";
import StarRating from "../components/StarRating";
import { CgPlayListRemove } from "react-icons/Cg";

const CompletedList = ({
  completedList,
  setCompletedList,
  redirectToDetails,
  setRedirectToDetails,
  setBookDetails,
}) => {
  useEffect(
    () => setCompletedList(JSON.parse(localStorage.getItem("completedList"))),
    []
  );

  const removeFromCompletedList = (id) => {
    const tempCompletedList = [...completedList];

    const bookIndex = tempCompletedList.findIndex((book) => book.id === id);
    tempCompletedList.splice(bookIndex, 1);

    setCompletedList(tempCompletedList);
    localStorage.setItem("completedList", JSON.stringify(tempCompletedList));
  };

  return (
    <div className={styles.completedPage}>
      <section className={styles.completedTab}>
      <h1 className={styles.pageTitle}>Completed List</h1>
        {completedList
          ? completedList.map((book) => (
              <article key={book.id} className={styles.completedTab}>
                <h3>{book.volumeInfo.title}</h3>
                <h4>{book.volumeInfo.authors[0]}</h4>
                <div>
                  <img
                    className={styles.bookImg}
                    src={book.volumeInfo.imageLinks.smallThumbnail}
                    onClick={() => {
                      setBookDetails(book);
                      setRedirectToDetails(true);
                    }}
                  />
                </div>

                <StarRating ratedBook={book} initialStars={book.userGrade} />
                <p>{book.volumeInfo.description.slice(0, 400)}...</p>
                <div>
                  <CgPlayListRemove
                    className={styles.actionBtn}
                    onClick={() => removeFromCompletedList(book.id)}
                  />
                </div>
                <hr />
              </article>
            ))
          : null}
      </section>
      {redirectToDetails ? <Redirect to={"/Details"} /> : null}
    </div>
  );
};

export default CompletedList;
