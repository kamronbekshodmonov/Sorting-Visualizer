import { FC, Dispatch, SetStateAction } from "react";
import config from "../../../../config";
import "./AnimationSpeed.scss";

const { ANIMATION_SPEED_MIN, ANIMATION_SPEED_MAX, ANIMATION_SPEED_STEP } =
  config;

type Props = {
  isSorting: boolean;
  animationSpeed: number;
  setAnimationSpeed: Dispatch<SetStateAction<number>>;
  isPaused: boolean;
};

const AnimationSpeed: FC<Props> = ({
  isSorting,
  animationSpeed,
  setAnimationSpeed,
  isPaused,
}) => {
  const handleSpeedChange = (e: any) => {
    setAnimationSpeed(ANIMATION_SPEED_MAX - e.target.value);
  };

  return (
    <div className="animation-speed">
      <p style={{ marginRight: "10px" }}>animation speed:</p>
      <input
        style={{ marginRight: "10px" }}
        disabled={isPaused ? false : isSorting}
        onChange={handleSpeedChange}
        defaultValue={ANIMATION_SPEED_MAX - animationSpeed}
        type="range"
        id="speed"
        name="speed"
        min="0"
        max={(ANIMATION_SPEED_MAX - ANIMATION_SPEED_MIN).toString()}
        step={ANIMATION_SPEED_STEP.toString()}
      />
      <p>{animationSpeed}ms</p>
    </div>
  );
};

export default AnimationSpeed;
