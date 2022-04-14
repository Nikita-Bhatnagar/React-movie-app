import React, { useContext, useEffect, useState } from "react";
import ShowTypeContext from "../../Context/ShowTypeContext";
import Card from "../Card/Card";
import Button from "../Button/Button";
import API_KEY from "../../config";
function SearchResult() {
  const ctx = useContext(ShowTypeContext);
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSearchResults(query, pageNum) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=en-US&page=${pageNum}&include_adult=false`
    );

    const data = await response.json();

    setResultsData(data.results);
  }
  let results = "";
  useEffect(() => {
    setIsLoading(true);

    if (ctx.searchQuery) {
      fetchSearchResults(ctx.searchQuery, 1);
      setIsLoading(false);
    }
  }, [ctx.searchQuery]);
  let count = 0;
  if (resultsData) {
    results = (
      <React.Fragment>
        {resultsData.map((elem) => {
          if (elem.media_type === "person") return <div></div>;
          else count++;
          return (
            <Card
              className="card-list"
              title={elem.title ? elem.title : elem.name}
              imgUrl={elem.poster_path}
              id={elem.id}
              key={elem.id}
              rating={elem.vote_average}
              language={elem.original_language}
              showType={elem.media_type}
            ></Card>
          );
        })}
      </React.Fragment>
    );
  }
  return (
    <div className="container2">
      <div
        className="list-heading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>
          Results |&nbsp;<span>({count})</span>
        </h2>
        <a href="">
          <Button
            className="back-btn"
            text="&#8592; &nbsp;&nbsp;Back"
            color=""
          ></Button>
        </a>
      </div>
      <hr />
      {isLoading && <div className="loader"></div>}
      {!isLoading && <div className="shows-row">{results}</div>}
    </div>
  );
}
export default SearchResult;
