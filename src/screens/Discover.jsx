import { Redirect } from "react-router-dom";
import styles from "../App.module.css";

const Discover = ({
  discoverList,
  setDiscoverList,
  readingList,
  setReadingList,
  setBookDetails,
  redirectToDetails,
  setRedirectToDetails,
}) => {
  const addToReadingList = (id) => {
    const tempDiscoverList = [...discoverList];
    const tempReadingList = JSON.parse(localStorage.getItem("readingList"))
      ? JSON.parse(localStorage.getItem("readingList"))
      : [];
    const bookToAdd = tempDiscoverList.find((book) => {
      if (book.id === id) {
        book.isReading = true;
        book.userNote = "";
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
    const readingList = JSON.parse(localStorage.getItem("readingList"));
    return readingList.find((book) => book.id === id);
  };

  return (
    <div>
      <h1>Discover</h1>
      <br />
      <section>
        {discoverList.slice(0, 10).map((book) => (
          <article key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <h4>{book.volumeInfo.authors[0]}</h4>
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
            <br />
            <br />
          </article>
        ))}
      </section>
      {redirectToDetails ? <Redirect to={"/Details"} /> : null}
    </div>
  );
};

export default Discover;
