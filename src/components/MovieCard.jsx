import React from "react";

function MovieCard({
  movieObj,
  handleAddtoWatchlist,
  handleRemovefromWatchlist,
  Watchlist,
}) {
  // Check if the movie is in the Watchlist based on imdbID
  function doesContain(movieObj) {
    for (let i = 0; i < Watchlist.length; i++) {
      if (Watchlist[i].imdbID === movieObj.imdbID) { // Use imdbID instead of id
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[50vh] w-[200px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(${movieObj.Poster})`,  // Use OMDb's movieObj.Poster
      }}
    >
      {/* Conditionally render Add/Remove from Watchlist buttons */}
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemovefromWatchlist(movieObj)}
          className="m-4 flex flex-col justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-4 flex flex-col justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}

      {/* Display movie title */}
      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/50 rounded-xl">
        {movieObj.Title}  {/* Use OMDb's movieObj.Title */}
      </div>
    </div>
  );
}

export default MovieCard;
