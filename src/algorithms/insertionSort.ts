import { animateValuesProps } from "../utils/animate";

const insertionSort = (array: number[]) => {
  const arrayCopy = [...array];
  const animateValues: animateValuesProps = [];

  for (let i = 1; i < array.length; i++) {
    let j = i;

    while (j > 0) {
      const firstIdx = j - 1;
      const secondIdx = j;

      animateValues.push(["compare", firstIdx, secondIdx]);
      if (arrayCopy[j] >= arrayCopy[j - 1]) {
        animateValues.push(["remove", firstIdx, secondIdx]);
        animateValues.push(["sorted", firstIdx]);
        animateValues.push(["sorted", secondIdx]);
        break;
      }

      swap(arrayCopy, firstIdx, secondIdx, animateValues);
      j -= 1;

      animateValues.push(["remove", firstIdx, secondIdx]);
      if (firstIdx === 0) {
        animateValues.push(["sorted", firstIdx]);
      }
      animateValues.push(["sorted", secondIdx]);
    }
  }

  return [animateValues, arrayCopy];
};

function swap(
  array: number[],
  i: number,
  j: number,
  animateValues: animateValuesProps
) {
  animateValues.push(["swap-background-color", i, j]);
  animateValues.push(["swap-height", i, j, array[i], array[j]]);

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export default insertionSort;
