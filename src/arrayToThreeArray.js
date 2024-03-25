/**
 * Converts a 2D string representation of an array into a 2D numerical array.
 * @param {number[][]} arr - 2d numerical array 
 * @returns {string} - returns the 2D string representation of the array.
 */
export function num2dArrayToThreeArray (arr) {
    let result = "=";
    if (!(arr == null)) {
        for (let i = 0;i < arr.length;i++) {
            if (i > 0) {
                result += ";";
            }
            for (let j = 0;j < arr[i].length;j++) {
                result += arr[i][j];
                if (j < arr[i].length - 1) {
                    result += ",";
                }
            }
        }
    }
    return result;
}