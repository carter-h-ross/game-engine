/**
 * Converts a 2D string representation of an array into a 2D numerical array.
 * @param {string} arrString - The 2D string representation of the array.
 * @returns {number[][] | null} - The 2D numerical array, or null if input is invalid.
 */
export function stringTo2dNumArray(arrString) {
    // Check if the input is a string
    if (typeof arrString !== 'string') {
        alert('Input should be a string.');
        return null;
    }

    // Remove whitespace and brackets from the string
    const cleanedString = arrString.replace(/\s+/g, '').replace(/\[|\]/g, '');

    // Check if the string contains only digits and commas
    const isValidInput = /^[0-9,]*$/.test(cleanedString);
    if (!isValidInput) {
        alert('Invalid syntax. Please use only digits and commas.');
        return null;
    }

    // Split the string into rows
    const rows = cleanedString.split(',');

    // Convert rows to numerical values and build the 2D array
    const result = rows.map(row => {
        const nums = row.split('').map(num => parseInt(num));
        return nums;
    });

    return result;
}