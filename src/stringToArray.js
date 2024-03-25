/**
 * Converts a 2D string representation of an array into a 2D numerical array.
 * @param {string} arrString - The 2D string representation of the array.
 * @returns {number[][] | null} - The 2D numerical array, or null if input is invalid.
 */
export function stringTo2dNumArray(arrString) {
    console.log(JSON.parse(arrString));
    return JSON.parse(arrString); 
}