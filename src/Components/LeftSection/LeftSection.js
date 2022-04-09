import { useEffect, useState, useContext } from "react";
import "./LeftSection.css";
import Card from "../Card/Card";
import ShowTypeContext from "../../Context/ShowTypeContext";
function LeftSection(props) {
  const ctx = useContext(ShowTypeContext);

  const typeOfShow = ctx.showType === "Movies" ? "movie" : "tv";
  const queryType = ctx.showType === "Movies" ? "now_playing" : "airing_today";

  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/${queryType}?api_key=0b3c0af77d91e9f3216e985b5b6fe7d4&language=en-US&page=1`
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
      {!isLoading && <div className="cards-array">{cardsArray}</div>}
    </div>
  );
}
export default LeftSection;
