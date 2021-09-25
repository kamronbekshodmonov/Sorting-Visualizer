const generateArray = (length = 20, min = 10, max = 300) => {
  const array: number[] = [];
  for (let i = 30; i < Number(length) + 30; i++) {
    array.push(randomIntFromInterval(min, max));
  }

  return array;
};

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default generateArray;
