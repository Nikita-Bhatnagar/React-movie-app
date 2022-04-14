import Card from "../Card/Card";
import { useState, useEffect, useContext } from "react";
import ShowTypeContext from "../../Context/ShowTypeContext";
import "./Movies.css";
import Error from "../Error/Error";
import API_KEY from "../../config";
function Popular(props) {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const ctx = useContext(ShowTypeContext);

  const typeOfShow = ctx.showType === "Movies" ? "movie" : "tv";

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/${props.type}?api_key=${API_KEY}&language=en-US&page=1`
      );
      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();

      setMovieData(data.results);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
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
      {error && <Error message="Something went wrong"></Error>}
      {isLoading && <div className="loader"></div>}
      {!isLoading && !error && <div className="movies-row">{cards}</div>}
    </section>
  );
}
export default Popular;
