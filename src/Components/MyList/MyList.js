import ShowsRow from "./ShowsRow";
function MyList(props) {
  return (
    <div className="container2">
      <ShowsRow type="movie"></ShowsRow>
      <ShowsRow type="tv"></ShowsRow>
    </div>
  );
}
export default MyList;
