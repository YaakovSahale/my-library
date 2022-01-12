import { useState, useEffect } from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Opening from "./screens/opening";
import Discover from "./screens/Discover";
import CompletedList from "./screens/CompletedList";
import Details from "./screens/Details";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";
import Register from "./screens/Register";
import ReadingList from "./screens/ReadingList";
import styles from "./App.module.css";
import logo from "./logo.svg";

function App() {
  const [userAuth, setUserAuth] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [discoverList, setDiscoverList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [bookDetails, setBookDetails] = useState("");
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  useEffect(showDefaultBooks, []);

  function showDefaultBooks() {
    const BOOKS_API_KEY = "AIzaSyBdqqFj-H9QS6WSClsEDJWvaa8hGlF5w7c";
    const URL = `https://www.googleapis.com/books/v1/volumes?q=react&key=${BOOKS_API_KEY}&maxResults=30`;
    axios
      .get(URL)
      .then((data) => {
        const booksData = data.data.items;
        console.log(booksData);
        booksData.map((book) => {
          book.isReading = false;
          book.userNote = "";
          book.userGrade = "";
        });
        setDiscoverList(booksData);
      })
      .catch((err) => console.error(err));
  }

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <nav>
          {userAuth ? (
            <>
              <Link to={"/Discover"}>Discover</Link>
              <Link to={"/ReadingList"}>ReadingList</Link>
              <Link to={"/CompletedList"}>CompletedList</Link>
              <button
                onClick={() => {
                  localStorage.removeItem("userAuth");
                  setUserAuth(null);
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <Redirect to={"/"} />
          )}
        </nav>

        <Switch>
          <Route
            exact
            path="/"
            render={() => <Opening setUserAuth={setUserAuth} />}
          />
          <Route
            exact
            path="/Register"
            render={() => (
              <Register userAuth={userAuth} setUserAuth={setUserAuth} />
            )}
          />
          <Route
            exact
            path="/Login"
            render={() => (
              <Login userAuth={userAuth} setUserAuth={setUserAuth} />
            )}
          />
          <Route
            exact
            path="/Discover"
            render={() => (
              <Discover
                readingList={readingList}
                setReadingList={setReadingList}
                discoverList={discoverList}
                setDiscoverList={setDiscoverList}
                completedList={completedList}
                setCompletedList={setCompletedList}
                setBookDetails={setBookDetails}
                redirectToDetails={redirectToDetails}
                setRedirectToDetails={setRedirectToDetails}
              />
            )}
          />
          <Route
            exact
            path="/ReadingList"
            render={() => (
              <ReadingList
                readingList={readingList}
                setReadingList={setReadingList}
                discoverList={discoverList}
                setDiscoverList={setDiscoverList}
                completedList={completedList}
                setCompletedList={setCompletedList}
              />
            )}
          />
          <Route
            exact
            path="/CompletedList"
            render={() => (
              <CompletedList
                readingList={readingList}
                setReadingList={setReadingList}
                discoverList={discoverList}
                setDiscoverList={setDiscoverList}
                completedList={completedList}
                setCompletedList={setCompletedList}
              />
            )}
          />
          <Route
            exact
            path="/Details"
            render={() => (
              <Details
                bookDetails={bookDetails}
                setRedirectToDetails={setRedirectToDetails}
              />
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
