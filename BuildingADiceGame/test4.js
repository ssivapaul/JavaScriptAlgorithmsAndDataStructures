//arr = [4, 2, 4, 6, 3, 4, 6, 1, 7, 3, 4, 5, 4, 4];
//arr = [1, 4, 3, 2, 3];
arr = [1, 4, 3, 2, 3];

const hasConsecutiveNumbers = (arr) => {
  const uniqueArr = [...new Set(arr)];
  uniqueArr.sort((a, b) => a - b);
  if (uniqueArr.length < 4) {
    return false;
  }
  for (let i = 0; i <= uniqueArr.length - 4; i++) {
    count = 0;
    for (let j = 1; j < 4; j++) {
      if (uniqueArr[j + i] === uniqueArr[j + i - 1] + 1) {
        count++;
      }
    }
    if (count === 3) return true;
  }
  return false;
};

console.log(hasConsecutiveNumbers(arr));
console.log(hasConsecutiveNumbers([1, 2, 5, 6, 7, 4])); // true (subarrays: [1,2,3] or [5,6,7])
console.log(hasConsecutiveNumbers([10, 12, 14, 15, 2])); // false
