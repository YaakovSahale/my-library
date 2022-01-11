const ReadingList = ({
  discoverList,
  setDiscoverList,
  readingList,
  setReadingList,
  completedList,
  setCompletedList,
}) => {

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
  };

  const addToCompletedList = (id) => {
    removeFromReadingList(id)
    const tempCompletedList = [...completedList];
    discoverList.find((book) => {
      if (book.id === id) tempCompletedList.push(book);
    });
    setCompletedList(tempCompletedList);
  };

  return (
    <div>
      <h1>ReadingList</h1>
      <br />
      <section>
        {readingList.map((book) => (
          <article key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <h4>{book.volumeInfo.authors[0]}</h4>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} />
            <p>{book.volumeInfo.description.slice(0, 400)}...</p>
            <button onClick={() => removeFromReadingList(book.id)}>
              remove from List
            </button>
            <button onClick={() => addToCompletedList(book.id)}>
              add to Completed
            </button>
            <br />
            <br />
          </article>
        ))}
      </section>
    </div>
  );
};

export default ReadingList;
