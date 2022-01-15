import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styles from "../App.module.css";
import { CgPlayListAdd } from "react-icons/Cg";
import { CgPlayListRemove } from "react-icons/Cg";

const Discover = ({
  discoverList,
  setDiscoverList,
  readingList,
  setReadingList,
  setBookDetails,
  redirectToDetails,
  setRedirectToDetails,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const addToReadingList = (id) => {
    const tempDiscoverList = [...discoverList];
    const tempReadingList = JSON.parse(localStorage.getItem("readingList"))
      ? JSON.parse(localStorage.getItem("readingList"))
      : [];

    const bookToAdd = tempDiscoverList.find((book) => {
      if (book.id === id) {
        book.isReading = true;
        book.userNotes = " ";
        book.userGrade = 0;
        return book;
      }
    });
    tempReadingList.push(bookToAdd);
    setReadingList(tempReadingList);
    setDiscoverList(tempDiscoverList);
    localStorage.setItem("readingList", JSON.stringify(tempReadingList));
    console.log(readingList);
  };

  const removeFromReadingList = (id) => {
    const tempDiscoverList = [...discoverList];
    const tempReadingList = JSON.parse(localStorage.getItem("readingList"));

    tempDiscoverList.find((book) => {
      if (book.id === id) book.isReading = false;
    });

    const bookIndex = tempReadingList.findIndex((book) => book.id === id);
    tempReadingList.splice(bookIndex, 1);
    setReadingList(tempReadingList);
    setDiscoverList(tempDiscoverList);
    localStorage.setItem("readingList", JSON.stringify(tempReadingList));
  };

  const isAlreadyReadInLocalStorage = (id) => {
    if (!JSON.parse(localStorage.getItem("readingList"))) return false;
    const readingList = JSON.parse(localStorage.getItem("readingList"));
    return readingList.find((book) => book.id === id);
  };

  const showDefaultBooks = (
    <section>
      {discoverList.slice(0, 10).map((book) => (
        <article key={book.id} className={styles.bookTab}>
          <div>
            <img
              className={styles.bookImg}
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              onClick={() => {
                setBookDetails(book);
                setRedirectToDetails(true);
              }}
            />
            <div>
              <h3 data-tip="title">{book.volumeInfo.title}</h3>
              <h4>{book.volumeInfo.authors}</h4>
            </div>
          </div>

          <p>{book.volumeInfo.description?.slice(0, 400)}...</p>
          <div>
            {book.isReading || isAlreadyReadInLocalStorage(book.id) ? (
              <CgPlayListRemove
                className={styles.actionBtn}
                onClick={() => removeFromReadingList(book.id)}
              />
            ) : (
              <CgPlayListAdd
                className={styles.actionBtn}
                onClick={() => addToReadingList(book.id)}
              />
            )}
          </div>
          <hr />
        </article>
      ))}
    </section>
  );

  const searchResult = (
    <section>
      {discoverList
        .filter((book) => {
          if (
            book.volumeInfo.description
              ?.toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            book.volumeInfo.title
              ?.toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            book.volumeInfo.authors
              ?.toLowerCase()
              .includes(searchInput.toLowerCase())
          ) {
            return book;
          }
        })
        .map((book) => (
          <article key={book.id}>
            <h3 data-tip="title">{book.volumeInfo.title}</h3>
            <h4>{book.volumeInfo.authors}</h4>
            <img
              className={styles.bookImg}
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              onClick={() => {
                setBookDetails(book);
                setRedirectToDetails(true);
              }}
            />
            <p>{book.volumeInfo.description?.slice(0, 400)}...</p>
            {book.isReading || isAlreadyReadInLocalStorage(book.id) ? (
              <button onClick={() => removeFromReadingList(book.id)}>
                remove from List
              </button>
            ) : (
              <button onClick={() => addToReadingList(book.id)}>
                add To List
              </button>
            )}
          </article>
        ))}
    </section>
  );

  return (
    <div className={styles.discover}>
      <div>
        <h1 className={styles.pageTitle}>Discover</h1>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput ? searchResult : showDefaultBooks}
      </div>

      {redirectToDetails ? <Redirect to={"/Details"} /> : null}
      <ReactTooltip />
    </div>
  );
};

export default Discover;
