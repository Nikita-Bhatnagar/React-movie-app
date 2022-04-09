import starIcon from "../../images/star-solid.svg";
import "./Card.css";
import movieBg from "../../images/movie-bg.jpg";
function Card(props) {
  let languageName = new Intl.DisplayNames(["en"], { type: "language" });
  const lang = languageName.of(props.language);
  const rating = (Number(props.rating) / 2).toFixed(1);
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
      <div
        className={`card ${props.className}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="info-row">
          <div className="col col-1">
            <p className="title">{props.title}</p>
          </div>
          <div className="col col-2">
            <p className="lang">{lang}</p>
            <p className="rating">
              <img src={starIcon} alt="star-icon" />
              {rating}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
export default Card;
