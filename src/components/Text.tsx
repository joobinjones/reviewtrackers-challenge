import { black } from "../styles/palette";

const Text = ({
  fontSize = "12px",
  fontWeight = 400,
  ml = "0",
  mb = "0",
  mt = "0",
  mr = "0",
  color = black,
  data = "",
}): JSX.Element => {
  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        margin: `${mt} ${mr} ${mb} ${ml}`,
      }}
    >
      {data}
    </div>
  );
};

export default Text;
