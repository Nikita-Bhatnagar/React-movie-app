import "./Header.css";
import { useContext } from "react";
import searchIcon from "../../images/magnifying-glass-solid.svg";
import ShowTypeContext from "../../Context/ShowTypeContext";
function Header(props) {
  const ctx = useContext(ShowTypeContext);
  function sendShowTypeHandler(e) {
    props.showTypeHandler(e.target.textContent);
  }
  return (
    <header>
      <div className="brand-name">Movies App</div>
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
        <div className="search">
          <form>
            <input
              type="search"
              placeholder="Search for movies, and tv shows..."
              className="search-input"
            />
          </form>
          <img src={searchIcon} alt="search-icon" className="search-icon" />
        </div>
      </div>
    </header>
  );
}
export default Header;
