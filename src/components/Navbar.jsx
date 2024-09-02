import React from "react";

import Logo from "../movie-icon.png";

import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex border items-center space-x-8 pl-3 py-4">
      <img className="w-[50px]" src={Logo} alt="" />

      <Link to="/" className="text-2xl font-bold text-blue-400">
        Movies
      </Link>

      <Link to="/watchlist" className="text-2xl font-bold text-blue-400">
        Watchlist
      </Link>
    </div>
  );
};
export default Navbar;
