import Card from "../Card/Card";
import { useState, useEffect, useContext } from "react";
import ShowTypeContext from "../../Context/ShowTypeContext";
import "./Movies.css";
function Popular(props) {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(ShowTypeContext);

  const typeOfShow = ctx.showType === "Movies" ? "movie" : "tv";
  const queryType = ctx.showType === "Movies" ? "now_playing" : "airing_today";

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/${props.type}?api_key=0b3c0af77d91e9f3216e985b5b6fe7d4&language=en-US&page=1`
      );
      const data = await res.json();

      setMovieData(data.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [ctx.showType]);

  const cards = movieData.map((elem) => {
    return (
      <Card
        title={elem.title ? elem.title : elem.name}
        imgUrl={elem.poster_path}
        id={elem.id}
        key={elem.id}
        rating={elem.vote_average}
        language={elem.original_language}
      ></Card>
    );
  });
  return (
    <section className="movies">
      <h2>
        {props.type === "popular"
          ? `Popular ${typeOfShow === "movie" ? "Movies" : "TV shows"}`
          : "Top Rated"}
      </h2>
      {isLoading && <div className="loader"></div>}
      {!isLoading && <div className="movies-row">{cards}</div>}
    </section>
  );
}
export default Popular;
