const detectFullHouse = (diceValuesArr) => {
  const groupedValues = diceValuesArr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  return groupedValues;
};

console.log(detectFullHouse(["2", "2", "2", "3", "3"]));

detectFullHouse.forEach();
