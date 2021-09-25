import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import Algorithms from "./components/Algorithms";
import SecondaryButtons from "./components/SecondaryButtons";
import ArraySize from "./components/ArraySize";
import AnimationSpeed from "./components/AnimationSpeed";
import generateArray from "../../utils/generateArray";
import { resetAnimatedValues } from "../../utils/animate";
import "./Navbar.scss";

import config from "../../config";
const { ARRAY_SIZE_DEFAULT, ANIMATION_SPEED_DEFAULT } = config;

type Props = {
  array: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
};

const Navbar: FC<Props> = ({ array, setArray }) => {
  const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEED_DEFAULT);
  const [timeoutValues, setTimeoutValues] = useState<any[]>([]);
  const [chosenAlgorithm, setChosenAlgorithm] = useState<any>();
  const [chosenAlgorithmName, setChosenAlgorithmName] = useState<string>();
  const [arraySize, setArraySize] = useState(ARRAY_SIZE_DEFAULT);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const generateNewArray = () => {
    setIsPaused(false);
    for (const time of timeoutValues) {
      time.cancel();
    }
    setTimeoutValues([]);

    const newGeneratedArray = generateArray(arraySize);
    setArray(newGeneratedArray);
    resetAnimatedValues(newGeneratedArray);
    setIsSorting(false);
    return newGeneratedArray;
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__top">
          <Algorithms
            isSorting={isSorting}
            setChosenAlgorithm={setChosenAlgorithm}
            setChosenAlgorithmName={setChosenAlgorithmName}
          />
          <SecondaryButtons
            isSorting={isSorting}
            chosenAlgorithm={chosenAlgorithm}
            chosenAlgorithmName={chosenAlgorithmName}
            setIsSorting={setIsSorting}
            animationSpeed={animationSpeed}
            array={array}
            setArray={setArray}
            generateNewArray={generateNewArray}
            timeoutValues={timeoutValues}
            setTimeoutValues={setTimeoutValues}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
        </div>

        <div className="navbar__bottom">
          <ArraySize
            array={array}
            style={{ marginRight: "40px" }}
            isSorting={isSorting}
            arraySize={arraySize}
            setArraySize={setArraySize}
          />
          <AnimationSpeed
            isSorting={isSorting}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            isPaused={isPaused}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
