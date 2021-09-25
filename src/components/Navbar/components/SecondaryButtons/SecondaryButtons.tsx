import { FC, Dispatch, SetStateAction } from "react";
import { animate, resetAnimatedValues } from "../../../../utils/animate";

import "./SecondaryButtons.scss";

type Props = {
  chosenAlgorithm: any;
  chosenAlgorithmName: string | undefined;
  isSorting: boolean;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
  animationSpeed: number;
  array: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
  generateNewArray: () => number[];
  timeoutValues: any[];
  setTimeoutValues: Dispatch<SetStateAction<any[]>>;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
};

const SecondaryButtons: FC<Props> = ({
  isSorting,
  chosenAlgorithm,
  chosenAlgorithmName,
  setIsSorting,
  animationSpeed,
  array,
  setArray,
  generateNewArray,
  timeoutValues,
  setTimeoutValues,
  isPaused,
  setIsPaused,
}) => {
  const handleSort = () => {
    if (!chosenAlgorithm) return;
    setIsSorting(true);
    resetAnimatedValues(array);
    const [animateValues, sortedArray] = chosenAlgorithm(array);
    const timeoutValues = animate(
      animateValues,
      animationSpeed,
      setIsSorting,
      sortedArray,
      setArray
    );
    setTimeoutValues(timeoutValues);
  };

  const pause = () => {
    setIsPaused(true);
    const newArray = [];

    for (const time of timeoutValues) {
      if (time._timeLeft > 0) {
        time.pause();
        newArray.push(time);
      }
    }
    setTimeoutValues(newArray);
  };

  const resume = () => {
    setIsPaused(false);
    let curTime = 0;

    for (const time of timeoutValues) {
      time.reset(curTime);
      time.resume();
      curTime += animationSpeed;
    }
  };

  return (
    <div className="secondary-buttons">
      <button
        className="btn btn--main"
        disabled={!chosenAlgorithm || isSorting}
        onClick={handleSort}
      >
        {!chosenAlgorithm
          ? "Choose Algortihm"
          : `Visualize ${chosenAlgorithmName}`}
      </button>
      <button className="btn" onClick={generateNewArray}>
        Generate new array
      </button>
      <button
        disabled={!isSorting ? true : isPaused}
        className="btn"
        onClick={pause}
      >
        Pause
      </button>
      <button
        disabled={!isSorting ? true : !isPaused}
        className="btn"
        onClick={resume}
      >
        Resume
      </button>
    </div>
  );
};

export default SecondaryButtons;
