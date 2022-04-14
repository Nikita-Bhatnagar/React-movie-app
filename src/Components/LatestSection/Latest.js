import { useState, useEffect, useContext } from "react";
import movieBg from "../../images/movie-bg.jpg";
import "./Latest.css";
import ShowTypeContext from "../../Context/ShowTypeContext";
import Error from "../Error/Error";
import API_KEY from "../../config";
function Latest(props) {
  const [latest, setLatest] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const ctx = useContext(ShowTypeContext);

  const typeOfShow = ctx.showType === "Movies" ? "movie" : "tv";

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/latest?api_key=${API_KEY}&language=en-US&include_adult=false`
      );
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setLatest(data);

      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [ctx.showType]);
  const imageUrl = latest.poster_path
    ? `https://image.tmdb.org/t/p/original/${latest.poster_path}`
    : movieBg;
  return (
    <section className="latest">
      <h2>Latest</h2>
      {isLoading && <div className="loader"></div>}
      {error && <Error message="Something went wrong"></Error>}
      {!isLoading && !error && (
        <div
          className="card-bigger"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="information">
            <p className="title">{latest.title ? latest.title : latest.name}</p>
            <p className="tagline">{latest.tagline}</p>
            <p className="stat">
              <span>{latest.status}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
  return <div></div>;
}
export default Latest;
