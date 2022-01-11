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
  const [details, setDetails] = useState("");

  useEffect(showDefaultBooks, []);

  function showDefaultBooks() {
    const BOOKS_API_KEY = "AIzaSyBdqqFj-H9QS6WSClsEDJWvaa8hGlF5w7c";
    const URL = `https://www.googleapis.com/books/v1/volumes?q=react&key=${BOOKS_API_KEY}&maxResults=30`;
    axios
      .get(URL)
      .then((data) => {
        console.log(data.data.items);
        const booksData = data.data.items;
        booksData.map((book) => (book.isReading = false));
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
              <button onClick={() => setUserAuth(null)}>Log out</button>
            </>
          ) : (
            <>
              <Link to={"/"}>Opening</Link>
              <Redirect to={"/"} />
            </>
          )}
        </nav>

        <Switch>
          <Route exact path="/" render={() => <Opening />} />
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
          <Route exact path="/Details" render={() => <Details />} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
