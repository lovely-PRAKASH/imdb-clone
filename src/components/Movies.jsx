import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddtoWatchlist,
  handleRemovefromWatchlist,
  Watchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setpageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setpageNo(1);
    } else {
      setpageNo(pageNo - 1);
    }
  };
  const handleNext = () => {
    setpageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=022336715fd4ca22993ab9629dd6cf25&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-2">
      <div className="m-5 font-bold text-xl text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-3">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemovefromWatchlist={handleRemovefromWatchlist}
              Watchlist={Watchlist}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=022336715fd4ca22993ab9629dd6cf25&language=en-US&page=1
