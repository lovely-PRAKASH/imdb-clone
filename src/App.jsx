import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  let [Watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchList = [...Watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let handleRemovefromWatchlist = (movieObj) => {
    let filterWatchlist = Watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filterWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filterWatchlist));
    console.log(filterWatchlist);
  };

  useEffect(() => {
    let moviesFromLocalStoage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStoage) {
      return;
    } else setWatchList(JSON.parse(moviesFromLocalStoage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  Watchlist={Watchlist}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemovefromWatchlist={handleRemovefromWatchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                Watchlist={Watchlist}
                setWatchList={setWatchList}
                handleRemovefromWatchlist={handleRemovefromWatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
