import ShowTypeContext from "../../Context/ShowTypeContext";
import React, { useContext, useState, useEffect, useMemo } from "react";
import "./ShowDetails.css";
import Button from "../Button/Button";
import FavButton from "../Button/FavButton";
import starIcon from "../../images/star-solid.svg";

function ShowDetail(props) {
  const ctx = useContext(ShowTypeContext);
  const [details, setDetails] = useState({});
  const [castDetails, setCastDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let showsData = [];
  if (localStorage.getItem("showsData"))
    showsData = JSON.parse(localStorage.getItem("showsData"));

  let typeOfShow = useMemo(() => {
    return ctx.showType === "Movies" ? "movie" : "tv";
  }, [props.id]);
  async function fetchDetails() {
    if (props.showType !== "") typeOfShow = props.showType;

    setIsLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/${typeOfShow}/${props.id}?api_key=0b3c0af77d91e9f3216e985b5b6fe7d4&language=en-US`
    );
    const data = await res.json();
    setDetails(data);

    const res2 = await fetch(
      `https://api.themoviedb.org/3/${typeOfShow}/${props.id}/credits?api_key=0b3c0af77d91e9f3216e985b5b6fe7d4&language=en-US`
    );
    const castData = await res2.json();
    setCastDetails(castData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDetails();
  }, [props.id]);
  const rating = (Number(details.vote_average) / 2).toFixed(1);
  let genres = <div className="genres"></div>;
  if (details.genres)
    genres = (
      <div className="genres">
        {details.genres.map((elem) => {
          return <Button text={elem.name} color="white" key={elem.id}></Button>;
        })}
      </div>
    );

  let castRow = <div className="cast-row"></div>;
  let count = 0;
  if (castDetails.cast) {
    castRow = (
      <div className="cast-row">
        {castDetails.cast.map((elem) => {
          count++;
          if (count > 6) return;
          return (
            <div className="profile-card" key={elem.id}>
              <img
                src={
                  elem.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${elem.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
                }
                alt=""
              />
              <p>{elem.name}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      {isLoading && <div className="loader details-loader"></div>}
      {!isLoading && (
        <div
          className="details"
          style={{
            backgroundImage: `${
              details.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`
                : ""
            }`,
          }}
        >
          <div className="detail-wrapper">
            <a href="#">
              <Button
                className="back-btn"
                text="&#8592; &nbsp;&nbsp;Back"
                color=""
              ></Button>
            </a>
            <div className="information-wrapper">
              <h1>{details.title ? details.title : details.name}</h1>
              <div className="stats">
                <p className="rating">
                  <img src={starIcon} alt="star icon" />
                  {rating}
                </p>
                <p className="duration">
                  {details.runtime
                    ? `Duration:
              ${(details.runtime / 60).toFixed(0)}hr ${details.runtime % 60}min`
                    : `No. of episodes: ${details.number_of_episodes}`}
                </p>
              </div>
              <p className="overview">{details.overview}</p>
              {genres}
              <FavButton
                className="favourite"
                id={props.id}
                title={details.title ? details.title : details.name}
                lang={details.original_language}
                posterUrl={details.poster_path}
                rating={details.vote_average}
                showType={props.showType !== "" ? props.showType : typeOfShow}
              ></FavButton>
              <div className="cast">
                <h3>CAST</h3>
                {castRow}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default ShowDetail;
