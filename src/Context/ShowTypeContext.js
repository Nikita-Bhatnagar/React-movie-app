import React from "react";
const ShowTypeContext = React.createContext({
  showType: "Movies",
  displayingMyList: false,
  dispayingSearchResults: false,
  searchQuery: "",
});
export default ShowTypeContext;
