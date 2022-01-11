import { useState } from "react";

const CompletedList = ({
  discoverList,
  setDiscoverList,
  readingList,
  setReadingList,
  completedList,
  setCompletedList,
}) => {
  const removeFromCompletedList = (id) => {
    const tempCompletedList = [...completedList]

    const bookIndex = tempCompletedList.findIndex((book) => book.id === id);
    tempCompletedList.splice(bookIndex, 1);

    setCompletedList(tempCompletedList);
  };

  return (
    <div>
      <h1>Completed List</h1>
      <br />
      <section>
        {completedList.map((book) => (
          <article key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <h4>{book.volumeInfo.authors[0]}</h4>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} />
            <p>{book.volumeInfo.description.slice(0, 400)}...</p>
            <button onClick={() => removeFromCompletedList(book.id)}>
              remove from List
            </button>
            <br />
            <br />
          </article>
        ))}
      </section>
    </div>
  );
};

export default CompletedList;
