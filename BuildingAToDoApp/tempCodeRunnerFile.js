function removeSpecialCharacters(val) {
  //return str.trim().replace(/[^a-zA-Z0-9 ]/g, "");
  return val.trim().replace(/[^A-Za-z0-9\s]/g, "");
}

let input = "Hello! How's it going? @2024";
let output = removeSpecialCharacters(input);
console.log(output); // Output: "Hello Hows it going 2024"
