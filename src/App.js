import "./App.css";
import Header from "./Components/Header/Header";
import Wrapper from "./Components/Wrapper/Wrapper";
import React, { createContext, useState } from "react";
import ShowTypeContext from "./Context/ShowTypeContext";

function App() {
  const [showType, setShowType] = useState("Movies");
  const [displayingList, setDisplayingList] = useState(false);
  const [dispayingResults, setDisplayingResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  function changeShowTypeHandler(val) {
    if (val === "Movies" || val === "TV shows") {
      setShowType(val);
      setDisplayingList(false);
      setDisplayingResults(false);
    } else if (val === "My List") {
      setDisplayingList(true);
      setDisplayingResults(false);
    }
  }
  function settingSearchQuery(query) {
    setSearchQuery(query);
    setDisplayingResults(true);
    setDisplayingList(false);
  }

  return (
    <div className="container" data-theme="light">
      <ShowTypeContext.Provider
        value={{
          showType: showType,
          displayingMyList: displayingList,
          dispayingSearchResults: dispayingResults,
          searchQuery: searchQuery,
        }}
      >
        <Header
          showTypeHandler={changeShowTypeHandler}
          searchQueryHandler={settingSearchQuery}
        ></Header>
        <Wrapper></Wrapper>
      </ShowTypeContext.Provider>
    </div>
  );
}

export default App;
