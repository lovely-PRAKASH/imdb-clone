import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddtoWatchlist, handleRemovefromWatchlist, Watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?s=movie&apikey=caa52171&page=${pageNo}`)
      .then((res) => {
        if (res.data.Response === "True") {
          console.log(res.data)
          setMovies(res.data.Search); // OMDb returns 'Search' array for multiple results
        } else {
          console.error("No movies found:", res.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the movies:", error);
      });
  }, [pageNo]);

  return (
    <div className="p-2">
      <div className="m-5 font-bold text-xl text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-3">
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.imdbID}
            movieObj={movieObj}
            poster_path={movieObj.Poster}
            name={movieObj.Title}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleRemovefromWatchlist={handleRemovefromWatchlist}
            Watchlist={Watchlist}
          />
        ))}
      </div>
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
}

export default Movies;
