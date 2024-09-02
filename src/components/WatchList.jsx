import React, { useEffect, useState } from "react";

function WatchList({ Watchlist, setWatchList, handleRemovefromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = [...Watchlist].sort((movieA, movieB) => {
      return parseFloat(movieA.imdbRating) - parseFloat(movieB.imdbRating);
    });
    setWatchList(sortedIncreasing);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = [...Watchlist].sort((movieA, movieB) => {
      return parseFloat(movieB.imdbRating) - parseFloat(movieA.imdbRating);
    });
    setWatchList(sortedDecreasing);
  };

  useEffect(() => {
    let tempGenres = Watchlist.map((movieObj) => {
      return movieObj.Genre ? movieObj.Genre.split(", ")[0] : "Unknown Genre"; // Split genres correctly
    });
    tempGenres = [...new Set(tempGenres)]; // Make unique
    setGenreList(["All Genres", ...tempGenres]);
  }, [Watchlist]);

  return (
    <>
      <div className="flex flex-wrap justify-center m-4">
        {genreList.map((genre) => {
          return (
            <div
              key={genre}
              onClick={() => handleFilter(genre)}
              className={
                currGenre === genre
                  ? "flex justify-center items-center text-xl text-white font-bold bg-blue-400 h-[3rem] w-[9rem] rounded-xl mx-4 hover:cursor-pointer"
                  : "flex justify-center items-center text-xl text-white font-bold bg-gray-400/50 h-[3rem] w-[9rem] rounded-xl mx-4 hover:cursor-pointer"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div>
        <div className="flex justify-center my-4">
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Search Movies"
            className="bg-gray-200 px-2 h-[3rem] w-[18rem] px-4 outline-none"
          />
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
          <table className="w-full text-gray-400 text-center">
            <thead className="border-b-2">
              <tr>
                <th>Name</th>
                <th className="flex justify-center">
                  <div onClick={sortDecreasing} className="p-2">
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="p-2">Ratings</div>
                  <div onClick={sortIncreasing} className="p-2">
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {Watchlist.filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                } else {
                  return movieObj.Genre && movieObj.Genre.split(", ")[0] === currGenre; // Filter by genre
                }
              })
                .filter((movieObj) => {
                  return movieObj.Title.toLowerCase().includes(
                    search.toLowerCase()
                  );
                })
                .map((movieObj) => {
                  return (
                    <tr key={movieObj.imdbID} className="border-b-2">
                      <td className="flex items-center px-6 py-4">
                        <img
                          className="h-[6rem] w-[10rem]"
                          src={movieObj.Poster}
                          alt="movie Poster"
                        />
                        <div className="mx-10 text-xl">{movieObj.Title}</div>
                      </td>
                      <td>{movieObj.imdbRating ? movieObj.imdbRating : "N/A"}</td>
                      <td>{movieObj.Genre ? movieObj.Genre.split(", ")[0] : "Unknown Genre"}</td>
                      <td
                        onClick={() => {
                          handleRemovefromWatchlist(movieObj.imdbID); // Pass imdbID to remove only the selected movie
                        }}
                        className="text-red-600 hover:cursor-pointer"
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WatchList;
