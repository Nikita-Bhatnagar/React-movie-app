import "./App.css";
import Header from "./Components/Header/Header";
import Wrapper from "./Components/Wrapper/Wrapper";
import React, { useState } from "react";
import ShowTypeContext from "./Context/ShowTypeContext";

function App() {
  const [showType, setShowType] = useState("Movies");
  const [displayingList, setDisplayingList] = useState(false);
  function changeShowTypeHandler(val) {
    if (val === "Movies" || val === "TV shows") {
      setShowType(val);
      setDisplayingList(false);
    } else if (val === "My List") setDisplayingList(true);
  }

  return (
    <div className="container">
      <ShowTypeContext.Provider
        value={{ showType: showType, displayingMyList: displayingList }}
      >
        <Header showTypeHandler={changeShowTypeHandler}></Header>
        <Wrapper></Wrapper>
      </ShowTypeContext.Provider>
    </div>
  );
}

export default App;
