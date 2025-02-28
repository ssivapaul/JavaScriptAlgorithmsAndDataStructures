const regex = /([A-J])/g;
const text = "ABCDXYZ";
let match;

while ((match = regex.exec(text)) !== null) {
  console.log(`Found: ${match} at index ${match.index}`);
}
