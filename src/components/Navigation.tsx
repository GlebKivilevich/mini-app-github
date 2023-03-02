import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[85px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="text-xl font-semibold">Github Search</h3>
      <span>
        <Link to="/" className="text-xl mr-5">
          Home
        </Link>
        <Link to="/Favourites" className="text-xl">
          Favourites
        </Link>
      </span>
    </nav>
  );
};

export default Navigation;
