import Card from "../Card/Card";
import "./Row.css";
function ShowsRow(props) {
  let shows = [];
  if (localStorage.getItem("showsData")) {
    shows = [...JSON.parse(localStorage.getItem("showsData"))[props.type]];
  }
  return (
    <div className="container2">
      <div className="list-heading">
        <h2>
          {props.type === "movie" ? "Movies" : "TV Shows"} &nbsp;|{" "}
          <span>({shows.length})</span>
        </h2>

        <hr />
      </div>

      <div className="shows-row">
        {shows.map((elem) => {
          return (
            <Card
              className="card-list"
              title={elem.title}
              imgUrl={elem.imgUrl}
              id={elem.id}
              key={elem.id}
              rating={elem.rating}
              language={elem.language}
              showType={elem.showType}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}
export default ShowsRow;
