import { Dispatch, SetStateAction } from "react";
import { Timeout } from "managed-timeout";

import config from "./../config";
const {
  ANIMATION_DEFAULT_BACKGROUND_COLOR_BARS,
  ANIMATION_COMPARE_COLOR,
  ANIMATION_SWAP_COLOR,
  ANIMATION_SORTED_COLOR,
  ANIMATION_PIVID_COLOR,
} = config;

export type animateValuesProps = [string, number, number?, number?, number?][];

const defaultBackgroundColor = ANIMATION_DEFAULT_BACKGROUND_COLOR_BARS;
const compareColor = ANIMATION_COMPARE_COLOR;
const swapColor = ANIMATION_SWAP_COLOR;
const sortedColor = ANIMATION_SORTED_COLOR;
const pividColor = ANIMATION_PIVID_COLOR;

const animate = (
  animateValues: animateValuesProps,
  animationSpeed: number,
  setIsSorting: Dispatch<SetStateAction<boolean>>,
  sortedArray: number[],
  setArray: Dispatch<SetStateAction<number[]>>
) => {
  const timeoutsArray = [];

  for (let i = 0; i < animateValues.length; i++) {
    const arrayBars = document.getElementsByClassName("bar-container");
    const [animationType, first, second, firstValue, secondValue] =
      animateValues[i];
    const firstStyle = arrayBars[first] as HTMLElement;
    const secondStyle = second && (arrayBars[second] as HTMLElement);

    //ANIMATION TYPES
    let time = new Timeout(() => {
      //COMPARE
      if (animationType === "compare") {
        firstStyle.style.backgroundColor = compareColor;
        if (secondStyle) secondStyle.style.backgroundColor = compareColor;
      }

      //SWAP BACKGROUND COLOR
      else if (animationType === "swap-background-color") {
        firstStyle.style.backgroundColor = swapColor;
        if (secondStyle) secondStyle.style.backgroundColor = swapColor;
      }

      //OVERWRITE HEIGHT
      else if (animationType === "overwrite-height") {
        firstStyle.innerHTML = `<p>${second}</p>`;
        firstStyle.style.height = `${(second || 0) + 30}px`;
      }

      //SWAP HEIGHT
      else if (animationType === "swap-height") {
        firstStyle.innerHTML = `<p>${secondValue}</p>`;
        firstStyle.style.height = `${(secondValue || 0) + 30}px`;

        if (secondStyle) secondStyle.innerHTML = `<p>${firstValue}</p>`;
        if (secondStyle)
          secondStyle.style.height = `${(firstValue || 0) + 30}px`;
      }

      //SORTED
      else if (animationType === "sorted") {
        firstStyle.style.backgroundColor = sortedColor;
      } else if (animationType === "pivid") {
        firstStyle.style.backgroundColor = pividColor;
      }

      //REMOVE
      else if (animationType === "remove") {
        firstStyle.style.backgroundColor = defaultBackgroundColor;
        if (secondStyle)
          secondStyle.style.backgroundColor = defaultBackgroundColor;
      }
    }, i * animationSpeed);
    timeoutsArray.push(time);
  }

  const time = new Timeout(() => {
    setArray(sortedArray);
    setIsSorting(false);
  }, animateValues.length * animationSpeed);
  timeoutsArray.push(time);

  return timeoutsArray;
};

const resetAnimatedValues = (array: number[]) => {
  const arrayBars = document.getElementsByClassName("bar-container");
  for (let i = 0; i < array.length; i++) {
    const arrayBarStyle = arrayBars[i] as HTMLElement;

    if (arrayBarStyle) {
      arrayBarStyle.innerHTML = `<p>${array[i]}</p>`;
      arrayBarStyle.style.backgroundColor = defaultBackgroundColor;
    }
  }
};

export { animate, resetAnimatedValues };
