import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../moduls/models';

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFav(true);
    addFavourite(repo.html_url);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFav(false);
    removeFavourite(repo.html_url);
  };

  return (
    <div className="border py-3 px-5 roundeed mb-2 hover: shadow-md hover: bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Fork: <span className="font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>

      {!isFav ? (
        <button
          className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all"
          onClick={addToFavourite}
        >
          Add
        </button>
      ) : (
        <button
          className="py-2 px-4 bg-red-600 mr-2 rounded hover:shadow-md transition-all"
          onClick={removeFromFavourite}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default RepoCard;
