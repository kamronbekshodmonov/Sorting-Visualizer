const calculateBarWidth = (width: number, arrayLength: number) => {
  const containerPadding = 30;
  const barMarginRight = 2;

  return Math.floor(
    (width - containerPadding - arrayLength * barMarginRight) / arrayLength
  );
};

export default calculateBarWidth;
