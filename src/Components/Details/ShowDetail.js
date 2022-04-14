import ShowTypeContext from "../../Context/ShowTypeContext";
import React, { useContext, useState, useEffect, useMemo } from "react";
import "./ShowDetails.css";
import Button from "../Button/Button";
import FavButton from "../Button/FavButton";
import Error from "../Error/Error";
import API_KEY from "../../config";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

function ShowDetail(props) {
  const ctx = useContext(ShowTypeContext);
  const [details, setDetails] = useState({});
  const [castDetails, setCastDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  let typeOfShow = useMemo(() => {
    return ctx.showType === "Movies" ? "movie" : "tv";
  }, [props.id]);
  async function fetchDetails() {
    if (props.showType !== "") typeOfShow = props.showType;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/${props.id}?api_key=${API_KEY}&language=en-US`
      );
      if (!res.ok) throw new Error("Details not found");
      const data = await res.json();
      setDetails(data);

      const res2 = await fetch(
        `https://api.themoviedb.org/3/${typeOfShow}/${props.id}/credits?api_key=${API_KEY}&language=en-US`
      );
      if (!res2.ok) throw new Error("Cast details not found");
      const castData = await res2.json();
      setCastDetails(castData);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [props.id]);
  const rating = (Number(details.vote_average) / 2).toFixed(1);
  let counter = Number(rating).toFixed(0);
  let halfcounter = Number(Number(rating.slice(1, 3)));
  if (halfcounter === 0.5) {
    halfcounter = 1;
    counter--;
  } else {
    halfcounter = 0;
  }

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
            {error && <Error message="Details not found"></Error>}
            {!error && (
              <div className="information-wrapper">
                <div className="title-and-fav">
                  <h1>{details.title ? details.title : details.name}</h1>
                  <FavButton
                    className="favourite"
                    id={props.id}
                    title={details.title ? details.title : details.name}
                    lang={details.original_language}
                    posterUrl={details.poster_path}
                    rating={details.vote_average}
                    showType={
                      props.showType !== "" ? props.showType : typeOfShow
                    }
                  ></FavButton>
                </div>
                <div className="stats">
                  <p className="rating">
                    {(counter-- > 0 && <FaStar />) ||
                      (halfcounter-- > 0 && <FaStarHalf />)}
                    {(counter-- > 0 && <FaStar />) ||
                      (halfcounter-- > 0 && <FaStarHalf />)}
                    {(counter-- > 0 && <FaStar />) ||
                      (halfcounter-- > 0 && <FaStarHalf />)}
                    {(counter-- > 0 && <FaStar />) ||
                      (halfcounter-- > 0 && <FaStarHalf />)}
                    {(counter-- > 0 && <FaStar />) ||
                      (halfcounter-- > 0 && <FaStarHalf />)}

                    <span>{rating}</span>
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

                <div className="cast">
                  <h3>CAST</h3>
                  {castRow}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default ShowDetail;
