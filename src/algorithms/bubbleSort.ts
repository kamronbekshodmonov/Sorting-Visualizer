import { animateValuesProps } from "../utils/animate";

const bubbleSort = (array: number[]) => {
  const arrayCopy = [...array];
  const animateValues: animateValuesProps = [];

  let counter: number = 0;
  let isSorted: boolean = false;

  while (!isSorted) {
    isSorted = true;

    for (let i = 1; i < array.length - counter; i++) {
      const firstIdx = i - 1;
      const secondIdx = i;
      animateValues.push(["compare", firstIdx, secondIdx]);

      if (arrayCopy[firstIdx] > arrayCopy[secondIdx]) {
        swap(arrayCopy, firstIdx, secondIdx, animateValues);
        isSorted = false;
      }
      animateValues.push(["remove", firstIdx, secondIdx]);
    }

    animateValues.push(["sorted", array.length - counter - 1]);
    counter++;
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

export default bubbleSort;
