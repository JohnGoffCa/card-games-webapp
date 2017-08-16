/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 *
 * from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
module.exports = function shuffle(a) {
  const temp = a.slice(0);
    for (let i = temp.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [temp[i - 1], temp[j]] = [temp[j], temp[i - 1]];
    }
  return temp;
}
