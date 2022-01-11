const Discover = ({
  discoverList,
  setDiscoverList,
  readingList,
  setReadingList,
}) => {
  const addToReadingList = (id) => {
    const tempReadingList = [...readingList];
    const tempDiscoverList = [...discoverList];
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
    console.log(readingList);
  };

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

  return (
    <div>
      <h1>Discover</h1>
      <br />
      <section>
        {discoverList.slice(0,10).map((book) => (
          <article key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <h4>{book.volumeInfo.authors[0]}</h4>
            <img src={book.volumeInfo.imageLinks?.smallThumbnail} />
            <p>{book.volumeInfo.description?.slice(0, 400)}...</p>
            {book.isReading ? (
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
    </div>
  );
};

export default Discover;
