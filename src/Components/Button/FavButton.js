import heartIconRegular from "../../images/heart-regular.svg";
import heartIconSolid from "../../images/heart-solid.svg";
import { useState, useEffect } from "react";
function FavButton(props) {
  const [isInList, setIsInList] = useState(false);
  let showsData = { movie: [], tv: [] };
  if (localStorage.getItem("showsData")) {
    showsData = JSON.parse(localStorage.getItem("showsData"));
  }
  //checking if the id is already in list
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
    } else setIsInList(false);
  }, [props.id]);

  function addToListHandler(e) {
    if (!isInList) {
      const obj = {
        id: props.id,
        imgUrl: props.posterUrl,
        title: props.title,
        language: props.lang,
        rating: props.rating,
        showType: props.showType,
      };
      if (props.showType === "movie") {
        showsData.movie.push(obj);
      } else if (props.showType === "tv") {
        showsData.tv.push(obj);
      }
      setIsInList(true);
    } else {
      showsData[props.showType] = showsData[props.showType].filter((elem) => {
        return elem.id !== props.id;
      });
      setIsInList(false);
    }
    localStorage.setItem("showsData", JSON.stringify(showsData));
  }
  return (
    <button className="favourite" type="button" onClick={addToListHandler}>
      {!isInList && <img src={heartIconRegular} alt="heart-icon-unfilled" />}
      {isInList && <img src={heartIconSolid} alt="heart-icon-filled" />}
    </button>
  );
}
export default FavButton;
