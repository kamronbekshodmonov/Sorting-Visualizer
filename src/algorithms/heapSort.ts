import { animateValuesProps } from "../utils/animate";

const heapSort = (array: number[]) => {
  const arrayCopy = [...array];
  const animateValues: animateValuesProps = [];

  buildMaxHeap(arrayCopy, animateValues);
  for (let endIdx = arrayCopy.length - 1; endIdx > 0; endIdx--) {
    swap(arrayCopy, 0, endIdx, animateValues);
    animateValues.push(["sorted", endIdx]);
    siftDown(0, endIdx - 1, arrayCopy, animateValues);
  }

  animateValues.push(["sorted", 0]);
  return [animateValues, arrayCopy];
};

function buildMaxHeap(array: number[], animateValues: animateValuesProps) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, array.length - 1, array, animateValues);
  }
}

function siftDown(
  currentIdx: number,
  endIdx: number,
  heap: number[],
  animateValues?: animateValuesProps
) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }

    if (animateValues) {
      animateValues.push(["compare", idxToSwap, currentIdx]);
    }
    if (heap[idxToSwap] > heap[currentIdx]) {
      swap(heap, currentIdx, idxToSwap, animateValues);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      if (animateValues) {
        animateValues.push(["remove", idxToSwap, currentIdx]);
      }
      return;
    }
  }
}

function swap(
  array: number[],
  i: number,
  j: number,
  animateValues?: animateValuesProps
) {
  if (animateValues) {
    animateValues.push(["swap-background-color", i, j]);
    animateValues.push(["swap-height", i, j, array[i], array[j]]);
  }

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  if (animateValues) {
    animateValues.push(["remove", i, j]);
  }
}

export default heapSort;
