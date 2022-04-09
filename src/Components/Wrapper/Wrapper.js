import "./Wrapper.css";
import { useState } from "react";
import LeftSection from "../LeftSection/LeftSection";
import RightSection from "../RightSection/RightSection";
function Wrapper(props) {
  const [displayingLeft, setDisplayingLeft] = useState(true);
  function displayLeftHandler(val) {
    setDisplayingLeft(val);
  }
  return (
    <div className="wrapper">
      <LeftSection className={!displayingLeft ? "hide" : ""}></LeftSection>
      <RightSection displayLeft={displayLeftHandler}></RightSection>
    </div>
  );
}
export default Wrapper;
