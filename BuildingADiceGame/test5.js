const checkForStraights = (diceValuesArr) => {
  diceValuesArr.sort((a, b) => a - b);

  if (diceValuesArr.length >= 4) {
    counter = 0;
    for (let i = 0; i <= diceValuesArr.length - 4; i++) {
      count = 0;
      for (let j = 1; j < diceValuesArr.length; j++) {
        if (diceValuesArr[j + i] === diceValuesArr[j + i - 1] + 1) count++;
      }
      if (count > counter) counter = count;
    }
  }
};

console.log(checkForStraights([2, 3, 4, 5, 6]));
