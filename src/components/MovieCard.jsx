import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchlist,
  handleRemovefromWatchlist,
  Watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < Watchlist.length; i++) {
      if (Watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[50vh] w-[200px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemovefromWatchlist(movieObj)}
          className="m-4 flex flex-col justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60 "
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-4 flex flex-col justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60 "
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/50 rounded-xl">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
