import { useState, useEffect, useContext } from "react";
import movieBg from "../../images/movie-bg.jpg";
import "./Latest.css";
import ShowTypeContext from "../../Context/ShowTypeContext";
function Latest(props) {
  const [latest, setLatest] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(ShowTypeContext);

  const typeOfShow = ctx.showType === "Movies" ? "movie" : "tv";

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/latest?api_key=0b3c0af77d91e9f3216e985b5b6fe7d4&language=en-US`
      );
      const data = await res.json();
      setLatest(data);

      setIsLoading(false);
    } catch (err) {
      console(err.message);
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
      {!isLoading && (
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
