/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 *
 * from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
module.exports = function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
