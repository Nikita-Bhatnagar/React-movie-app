import { useEffect, useState, useContext } from "react";
import "./LeftSection.css";
import Card from "../Card/Card";
import Error from "../Error/Error";
import ShowTypeContext from "../../Context/ShowTypeContext";
import API_KEY from "../../config";

function LeftSection(props) {
  const ctx = useContext(ShowTypeContext);

  const typeOfShow = ctx.showType === "Movies" ? "movie" : "tv";
  const queryType = ctx.showType === "Movies" ? "now_playing" : "airing_today";

  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/${queryType}?api_key=${API_KEY}&language=en-US&page=1`
      );
      if (!res.ok) throw new Error("Something went wrong");
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

  const cardsArray = movieData.map((elem) => {
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
    <div className={`left ${props.className}`}>
      <h2>{queryType === "now_playing" ? "Now Playing" : "Airing Today"}</h2>
      {isLoading && <div className="loader"></div>}
      {error && <Error message="Something went wrong"></Error>}
      {!isLoading && !error && <div className="cards-array">{cardsArray}</div>}
    </div>
  );
}
export default LeftSection;
