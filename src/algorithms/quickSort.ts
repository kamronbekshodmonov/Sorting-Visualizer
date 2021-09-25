import { animateValuesProps } from "../utils/animate";

const quickSort = (array: number[]) => {
  const arrayCopy = [...array];
  const animateValues: animateValuesProps = [];

  quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, animateValues);
  return [animateValues, arrayCopy];
};

function quickSortHelper(
  array: number[],
  startIdx: number,
  endIdx: number,
  animateValues: animateValuesProps
) {
  if (startIdx === endIdx) {
    animateValues.push(["sorted", startIdx]);
  }
  if (startIdx >= endIdx) return;

  const pividIdx = startIdx;
  let firstIdx = startIdx + 1;
  let secondIdx = endIdx;

  animateValues.push(["pivid", pividIdx]);
  while (secondIdx >= firstIdx) {
    animateValues.push(["compare", firstIdx, secondIdx]);
    animateValues.push(["remove", firstIdx, secondIdx]);

    if (
      array[firstIdx] > array[pividIdx] &&
      array[secondIdx] < array[pividIdx]
    ) {
      swap(array, firstIdx, secondIdx, animateValues);
    }

    if (array[pividIdx] >= array[firstIdx]) firstIdx++;
    if (array[pividIdx] <= array[secondIdx]) secondIdx--;
  }

  animateValues.push(["remove", pividIdx]);
  swap(array, pividIdx, secondIdx, animateValues);

  animateValues.push(["sorted", pividIdx]);
  animateValues.push(["sorted", secondIdx]);

  let isLeftSubarrayGreater =
    secondIdx - 1 - startIdx >= endIdx - (secondIdx + 1);
  if (isLeftSubarrayGreater) {
    quickSortHelper(array, secondIdx + 1, endIdx, animateValues);
    quickSortHelper(array, startIdx, secondIdx - 1, animateValues);
  } else {
    quickSortHelper(array, startIdx, secondIdx - 1, animateValues);
    quickSortHelper(array, secondIdx + 1, endIdx, animateValues);
  }
}

function swap(
  array: number[],
  i: number,
  j: number,
  animateValues: animateValuesProps
) {
  animateValues.push(["swap-background-color", i, j]);
  animateValues.push(["swap-height", i, j, array[i], array[j]]);
  animateValues.push(["remove", i, j]);

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export default quickSort;
