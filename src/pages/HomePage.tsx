import React, { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

function HomePage() {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);

  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length >= 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen">
      <div className="relative w-[560px]">
        <input
          type="text"
          className="py-2 px-4 w-full h-[42px] mb-2 border-blue-500 rounded-md outline-none border-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isError && <p className="text-center text-red-600">Something went wrong...</p>}
        {dropdown && (
          <ul
            className={`list-none absolute top-[42px] left-0 right-0 max-h-[350px] ${
              data?.length! > 3 ? 'overflow-y-scroll' : ''
            }  shadow-md bg-white`}
          >
            {isLoading && <p className="text-center text-green-600">Loading...</p>}
            {data?.map((user) => (
              <li
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors flex items-start text-lg justify-between"
                key={user.id}
              >
                <a href={user.html_url} target="_blank" className="flex mr-5 items-start cursor-pointer">
                  <img className="w-10 h-10 mr-3.5" src={user.avatar_url} alt="photo-user" />
                  {user.login}
                </a>
                <p onClick={() => clickHandler(user.login)} className="cursor-pointer">
                  Show Reposi
                </p>
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <p className="text-center">Repos are loading</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
