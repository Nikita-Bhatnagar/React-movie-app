import searchIcon from "../../images/magnifying-glass-solid.svg";
import { useRef, useState } from "react";
function Search(props) {
  const searchQueryRef = useRef("");

  function searchHandler(e) {
    e.preventDefault();
    if (searchQueryRef.current.value.trim() !== "")
      props.searchQueryHandler(searchQueryRef.current.value);
    setDisplaySearchBar(false);
    searchQueryRef.current.value = "";
  }
  //for displaying or hiding searchbar in mobile view
  const [displayingSearchBar, setDisplaySearchBar] = useState(false);
  function displaySearchBar(e) {
    setDisplaySearchBar(true);
  }
  return (
    <div className="search">
      <form onSubmit={searchHandler}>
        <input
          type="search"
          placeholder="Search for movies, and tv shows..."
          className={`search-input ${
            !displayingSearchBar ? "hide-search-bar" : ""
          }`}
          ref={searchQueryRef}
        />
      </form>
      <img
        src={searchIcon}
        alt="search-icon"
        className="search-icon"
        onClick={displaySearchBar}
      />
    </div>
  );
}
export default Search;
