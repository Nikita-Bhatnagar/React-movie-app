import Latest from "../LatestSection/Latest";
import Movies from "../Movies/Movies";
import "./RightSection.css";
import ShowDetail from "../Details/ShowDetail";
import MyList from "../MyList/MyList";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ShowTypeContext from "../../Context/ShowTypeContext";
function RightSection(props) {
  const [showDetails, setShowDetails] = useState({
    displayingdetails: false,
    id: "",
    showType: "",
  });
  const ctx = useContext(ShowTypeContext);
  const [hash, setHash] = useState(window.location.hash.slice(1));
  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash.slice(1));
  }, []);
  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);

    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  useEffect(() => {
    if (ctx.displayingMyList) props.displayLeft(false);
    else props.displayLeft(true);
  }, [ctx.displayingMyList]);

  useEffect(() => {
    if (hash !== "") {
      let showsType = "";
      let ID = hash;
      let index = hash.indexOf("/");
      if (index !== -1) {
        showsType = hash.substring(0, index);
        ID = hash.substring(index + 1, hash.length);
      }

      setShowDetails({
        displayingdetails: true,
        id: ID,
        showType: showsType,
      });
      props.displayLeft(false);
    } else {
      setShowDetails({ displayingdetails: false, id: "", showType: "" });
      props.displayLeft(true);
    }
  }, [hash]);

  return (
    <div className="right">
      {showDetails.displayingdetails && (
        <ShowDetail
          id={showDetails.id}
          showType={showDetails.showType}
        ></ShowDetail>
      )}
      {!showDetails.displayingdetails && !ctx.displayingMyList && (
        <React.Fragment>
          <Movies type="popular"></Movies>
          <Movies type="top_rated"></Movies>
          <Latest></Latest>
        </React.Fragment>
      )}
      {ctx.displayingMyList && !showDetails.displayingdetails && (
        <MyList></MyList>
      )}
    </div>
  );
}
export default RightSection;
