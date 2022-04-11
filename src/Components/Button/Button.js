import "./Button.css";
import { useContext } from "react";
import ShowTypeContext from "../../Context/ShowTypeContext";
function Button(props) {
  // const ctx=useContext(ShowTypeContext);
  // setInitialState()
  // {

  // }
  let classes = `${props.className} button`;
  return (
    <button className={classes} type="button">
      {props.text}
    </button>
  );
}
export default Button;
