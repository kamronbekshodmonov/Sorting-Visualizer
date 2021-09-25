import { FC } from "react";
import WindowDimensions from "../../hooks/WindowDimensions";
import calculateBarWidth from "../../utils/calculateBarWidth";
import "./Bar.scss";

type Props = {
  array: number[];
};

const Bar: FC<Props> = ({ array }) => {
  const { width } = WindowDimensions();

  const barWidth = calculateBarWidth(width, array.length);

  return (
    <div style={{ height: `${300 + 30}px` }} className="bar">
      {array.map((value: number, idx: number) => (
        <div
          style={{
            height: `${value + 30}px`,
            width: `${barWidth > 50 ? 50 : barWidth}px`,
          }}
          className={`bar-container ${barWidth < 40 && "bar-container--small"}`}
          key={idx}
        >
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Bar;
