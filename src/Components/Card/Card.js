import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import "./Card.css";
import movieBg from "../../images/movie-bg.jpg";
import heartSolid from "../../images/heart-solid.svg";
import heartRegular from "../../images/heart-regular.svg";
import { useEffect, useState } from "react";
function Card(props) {
  const [isInList, setIsInList] = useState(false);
  let showsData = { movie: [], tv: [] };
  if (localStorage.getItem("showsData")) {
    showsData = JSON.parse(localStorage.getItem("showsData"));
  }

  useEffect(() => {
    if (
      showsData["movie"].some((elem) => {
        return props.id == elem.id;
      })
    ) {
      setIsInList(true);
    } else if (
      showsData["tv"].some((elem) => {
        return props.id == elem.id;
      })
    ) {
      setIsInList(true);
    } else {
      setIsInList(false);
    }
  });

  let languageName = new Intl.DisplayNames(["en"], { type: "language" });
  const lang = languageName.of(props.language);

  const rating = (Number(props.rating) / 2).toFixed(1);
  let counter = Number(rating).toFixed(0);
  let halfcounter = Number(Number(rating.slice(1, 3)));
  if (halfcounter === 0.5) {
    halfcounter = 1;
    counter--;
  } else {
    halfcounter = 0;
  }

  let imageUrl = movieBg;
  if (props.imgUrl) {
    imageUrl = `https://image.tmdb.org/t/p/w300${props.imgUrl}`;
  }
  let url;
  if (props.showType) {
    url = `#${props.showType}/${props.id}`;
  } else url = `#${props.id}`;

  return (
    <a href={url}>
      <div className={`card ${props.className}`}>
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="bg-image"
        >
          <img
            src={isInList ? heartSolid : heartRegular}
            alt="heart-icon"
            className="heart-icon"
          />
          <div className="info-row">
            <div className="col col-1">
              <p className="title">{props.title}</p>
            </div>
            <div className="col col-2">
              <p className="lang">{lang}</p>
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
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
export default Card;
