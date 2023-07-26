import React from "react";
const Search = () => {
  return (
    <form className="w-full pl-64 pr-64">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none ">
          <svg
            className="w-7 h-7 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-16 text-sm border  border-black rounded-full focus:ring-blue-500 "
          placeholder="검색어를 입력해 주세요."
          required
        />
      </div>
    </form>
  );
};
export default Search;
