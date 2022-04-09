import "./Button.css";
function Button(props) {
  let classes = `${props.className} button`;
  return (
    <button className={classes} type="button">
      {props.text}
    </button>
  );
}
export default Button;
