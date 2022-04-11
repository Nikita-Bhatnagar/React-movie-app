import "./Header.css";
import { useContext } from "react";
import Search from "../Search/Search";

import ShowTypeContext from "../../Context/ShowTypeContext";
function Header(props) {
  const ctx = useContext(ShowTypeContext);
  function sendShowTypeHandler(e) {
    props.showTypeHandler(e.target.textContent);
  }
  function sendSearchQuery(query) {
    props.searchQueryHandler(query);
  }
  return (
    <header>
      <div className="brand-name">
        <a href="">Movies App</a>
      </div>
      <ul className="nav">
        <li
          className={`nav-item ${ctx.showType === "Movies" ? "selected" : ""}`}
          onClick={sendShowTypeHandler}
        >
          Movies
        </li>
        <li
          className={`nav-item ${
            ctx.showType === "TV shows" ? "selected" : ""
          }`}
          onClick={sendShowTypeHandler}
        >
          TV shows
        </li>
      </ul>
      <div className="options">
        <div className="nav-item" onClick={sendShowTypeHandler}>
          My List
        </div>
        <Search searchQueryHandler={sendSearchQuery}></Search>
      </div>
    </header>
  );
}
export default Header;
