import { FC, Dispatch, SetStateAction } from "react";
import mergeSortAlgorithm from "../../../../algorithms/mergeSort";
import quickSortAlgorithm from "../../../../algorithms/quickSort";
import heapSortAlgorithm from "../../../../algorithms/heapSort";
import bubbleSortAlgorithm from "../../../../algorithms/bubbleSort";
import insertionSortAlgorithm from "../../../../algorithms/insertionSort";
import selectionSortAlgorithm from "../../../../algorithms/selectionSort";
import "./Algorithms.scss";

type Props = {
  setChosenAlgorithm: any;
  setChosenAlgorithmName: Dispatch<SetStateAction<string | undefined>>;
  isSorting: boolean;
};

const Algorithms: FC<Props> = ({
  setChosenAlgorithm,
  setChosenAlgorithmName,
  isSorting,
}) => {
  const algorithmsList = [
    {
      name: "Merge Sort",
      onClick: () => {
        setChosenAlgorithmName("Merge Sort");
        setChosenAlgorithm(() => mergeSortAlgorithm);
      },
    },
    {
      name: "Quick Sort",
      onClick: () => {
        setChosenAlgorithmName("Quick Sort");
        setChosenAlgorithm(() => quickSortAlgorithm);
      },
    },
    {
      name: "Heap Sort",
      onClick: () => {
        setChosenAlgorithmName("Heap Sort");
        setChosenAlgorithm(() => heapSortAlgorithm);
      },
    },
    {
      name: "Bubble Sort",
      onClick: () => {
        setChosenAlgorithm(() => bubbleSortAlgorithm);
        setChosenAlgorithmName("Bubble Sort");
      },
    },
    {
      name: "Insertion Sort",
      onClick: () => {
        setChosenAlgorithm(() => insertionSortAlgorithm);
        setChosenAlgorithmName("Insertion Sort");
      },
    },
    {
      name: "Selection Sort",
      onClick: () => {
        setChosenAlgorithm(() => selectionSortAlgorithm);
        setChosenAlgorithmName("Selection Sort");
      },
    },
  ];

  return (
    <div className="algorithms-list">
      {algorithmsList.map(
        (curAlgorithm: { name: string; onClick: any }, index: number) => {
          return (
            <button
              disabled={isSorting}
              className="btn"
              onClick={curAlgorithm.onClick}
              key={index}
            >
              {curAlgorithm.name}
            </button>
          );
        }
      )}
    </div>
  );
};

export default Algorithms;
