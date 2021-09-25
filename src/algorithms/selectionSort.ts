import { animateValuesProps } from "../utils/animate";

const selectionSort = (array: number[]) => {
  const arrayCopy = [...array];
  const animateValues: animateValuesProps = [];

  for (let i = 0; i < array.length; i++) {
    let smallest = i;
    for (let j = i + 1; j < array.length; j++) {
      const firstIdx = smallest;
      const secondIdx = j;

      animateValues.push(["compare", firstIdx, secondIdx]);
      animateValues.push(["remove", firstIdx, secondIdx]);
      if (arrayCopy[smallest] > arrayCopy[j]) {
        smallest = j;
      }
    }

    const firstIdx = i;
    const secondIdx = smallest;
    if (i !== smallest) {
      animateValues.push(["compare", firstIdx, secondIdx]);
      animateValues.push(["swap-background-color", firstIdx, secondIdx]);
      animateValues.push([
        "swap-height",
        firstIdx,
        secondIdx,
        arrayCopy[firstIdx],
        arrayCopy[secondIdx],
      ]);

      const temp = arrayCopy[firstIdx];
      arrayCopy[firstIdx] = arrayCopy[secondIdx];
      arrayCopy[secondIdx] = temp;
    }
    animateValues.push(["remove", firstIdx, secondIdx]);
    animateValues.push(["sorted", firstIdx]);
  }

  return [animateValues, arrayCopy];
};

export default selectionSort;
