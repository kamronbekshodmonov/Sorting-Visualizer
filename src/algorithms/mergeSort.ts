import { animateValuesProps } from "../utils/animate";

const mergeSort = (array: number[]) => {
  const arrayCopy = [...array];
  const animateValues: animateValuesProps = [];

  const extraArray = [...arrayCopy];
  mergeSortHelper(
    arrayCopy,
    0,
    arrayCopy.length - 1,
    extraArray,
    animateValues
  );
  return [animateValues, arrayCopy];
};

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  extraArray: number[],
  animateValues: animateValuesProps
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(extraArray, startIdx, middleIdx, mainArray, animateValues);
  mergeSortHelper(extraArray, middleIdx + 1, endIdx, mainArray, animateValues);
  doMerge(mainArray, startIdx, middleIdx, endIdx, extraArray, animateValues);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  extraArray: number[],
  animateValues: animateValuesProps
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  const isLastMerge = startIdx === 0 && endIdx === mainArray.length - 1;

  while (i <= middleIdx && j <= endIdx) {
    animateValues.push(["compare", i, j]);
    animateValues.push(["remove", i, j]);
    if (isLastMerge) animateValues.push(["sorted", i]);

    if (extraArray[i] <= extraArray[j]) {
      animateValues.push(["overwrite-height", k, extraArray[i]]);
      if (isLastMerge) animateValues.push(["sorted", k]);
      mainArray[k++] = extraArray[i++];
    } else {
      animateValues.push(["overwrite-height", k, extraArray[j]]);
      if (isLastMerge) animateValues.push(["sorted", k]);
      mainArray[k++] = extraArray[j++];
    }
  }

  while (i <= middleIdx) {
    animateValues.push(["compare", i, j]);
    animateValues.push(["remove", i, j]);
    if (isLastMerge) animateValues.push(["sorted", i]);
    animateValues.push(["overwrite-height", k, extraArray[i]]);
    if (isLastMerge) animateValues.push(["sorted", k]);
    mainArray[k++] = extraArray[i++];
  }

  while (j <= endIdx) {
    animateValues.push(["compare", i, j]);
    animateValues.push(["remove", i, j]);
    if (isLastMerge) animateValues.push(["sorted", i]);
    animateValues.push(["overwrite-height", k, extraArray[j]]);
    if (isLastMerge) animateValues.push(["sorted", k]);
    mainArray[k++] = extraArray[j++];
  }
}

export default mergeSort;
