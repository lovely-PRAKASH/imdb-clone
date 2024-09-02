import React, { useEffect, useState } from "react";

import genreids from "../Utilities/genre";

function WatchList({ Watchlist, setWatchList, handleRemovefromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList]= useState(['All Genres'])
  const [currGenre, setCurrGenre] = useState('All Genre')

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter=(genre)=>{
    setCurrGenre(genre)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = Watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = Watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  };

  useEffect(()=>{
    let temp=Watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set (temp)
    setGenreList(['All Genres', ...temp])
    console.log(temp)
  }, [Watchlist])

  return (
    <>
      <div className="flex flex-wrap justify-center m-4">
       
        {genreList.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className={currGenre==genre?"flex justify-center items-center text-xl text-white font-bold bg-blue-400 h-[3rem] w-[9rem] rounded-xl mx-4 hover:cursor-pointer":"flex justify-center items-center text-xl text-white font-bold bg-gray-400/50 h-[3rem] w-[9rem] rounded-xl mx-4 hover:cursor-pointer"}>
           {genre}
          </div>
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
        <div className=" overflow-hidden rounded-lg border border-gray-200 m-8">
          <table className="w-full text-gray-400 text-center">
            <thead className="border-b-2">
              <tr>
                <th>Name</th>
                <th className="flex justify-center">
                  <div onClick={sortDecreasing} className="p-2">
                    <i class="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="p-2">Ratings</div>
                  <div onClick={sortIncreasing} className="p-2">
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
                </th>
                <th>Popularity</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {Watchlist.filter((movieObj)=>{
                if(currGenre=='All Genres'){
                  return true
                }else{
                  return genreids[movieObj.genre_ids[0]]==currGenre;
                }
              }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }).map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                        alt="movie Poster"
                      />
                      <div className="mx-10 text-xl">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>{handleRemovefromWatchlist(movieObj)}} className="text-red-600 hover:cursor-pointer">Delete</td>
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
