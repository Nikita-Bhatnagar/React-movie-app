import "./Header.css";
import { useContext, useState } from "react";
import Search from "../Search/Search";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import ShowTypeContext from "../../Context/ShowTypeContext";
function Header(props) {
  const ctx = useContext(ShowTypeContext);

  function sendShowTypeHandler(e) {
    props.showTypeHandler(e.currentTarget.dataset.navoption);
  }
  function sendSearchQuery(query) {
    props.searchQueryHandler(query);
  }
  const [theme, setTheme] = useState("light");
  function changeThemeHandler() {
    const changedTheme = theme === "dark" ? "light" : "dark";
    setTheme(changedTheme);
    document.querySelector(".container").dataset.theme = changedTheme;
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
          data-navoption="Movies"
        >
          Movies
        </li>
        <li
          className={`nav-item ${
            ctx.showType === "TV shows" ? "selected" : ""
          }`}
          onClick={sendShowTypeHandler}
          data-navoption="TV shows"
        >
          TV shows
        </li>
      </ul>
      <div className="options">
        <div
          className="nav-item"
          data-navoption="My List"
          onClick={sendShowTypeHandler}
        >
          <CgPlayListAdd className="icon" />
        </div>
        <div onClick={changeThemeHandler} className="theme-toggler">
          {theme === "dark" && <BsFillSunFill className="icon" />}
          {theme === "light" && <BsFillMoonFill className="icon" />}
        </div>
        <Search searchQueryHandler={sendSearchQuery}></Search>
      </div>
    </header>
  );
}
export default Header;
