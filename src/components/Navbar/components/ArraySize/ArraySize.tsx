import {
  FC,
  useState,
  useEffect,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from "react";
import useWindowDimensions from "../../../../hooks/WindowDimensions";
import calculateBarWidth from "../../../../utils/calculateBarWidth";
import "./ArraySize.scss";

import config from "../../../../config";
const {
  ARRAY_SIZE_DEFAULT,
  ARRAY_SIZE_MIN,
  ARRAY_SIZE_MAX,
  ARRAY_SIZE_STEP,
  BAR_WIDTH_MIN,
} = config;

type Props = {
  array: number[];
  isSorting: boolean;
  arraySize: number;
  style?: CSSProperties;
  setArraySize: Dispatch<SetStateAction<number>>;
};

const ArraySize: FC<Props> = ({
  array,
  isSorting,
  arraySize,
  style,
  setArraySize,
}) => {
  const [arraySizeTimeout, setArraySizeTimeout] = useState<any>();
  const [maxArraySize, setMaxArraySize] = useState<number>(ARRAY_SIZE_DEFAULT);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const barWidth = calculateBarWidth(width, array.length);
    const newBarWidth = Math.floor((width - 30) / 4);
    const roundedBarWidth = newBarWidth - (newBarWidth % 10);

    setMaxArraySize(
      roundedBarWidth > ARRAY_SIZE_MAX ? ARRAY_SIZE_MAX : roundedBarWidth
    );

    if (barWidth < BAR_WIDTH_MIN) {
      setArraySize(newBarWidth > ARRAY_SIZE_MAX ? ARRAY_SIZE_MAX : newBarWidth);
    }
  }, [width]);

  const handleArraySizeChange = (e: any) => {
    clearTimeout(arraySizeTimeout);
    const curArraySizeTimeout = setTimeout(() => {
      setArraySize(e.target.value);
    }, 10);

    setArraySizeTimeout(curArraySizeTimeout);
  };

  return (
    <div style={style} className="array-size">
      <p style={{ marginRight: "10px" }}>array size</p>
      <input
        style={{ marginRight: "10px" }}
        disabled={isSorting}
        onChange={handleArraySizeChange}
        defaultValue={arraySize}
        type="range"
        id="arraySize"
        name="arraySize"
        min={ARRAY_SIZE_MIN.toString()}
        max={maxArraySize.toString()}
        step={ARRAY_SIZE_STEP.toString()}
      />
      <p>{arraySize < 100 ? `0${arraySize}` : arraySize}</p>
    </div>
  );
};

export default ArraySize;
