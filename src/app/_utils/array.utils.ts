export const isEmpty = <T>(array: T[]): boolean => array.length === 0

/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} start - The starting value of the range.
 * @param {number} [end] - The ending value of the range (optional).
 * @returns {number[]} An array containing the numbers in the specified range.
 *
 * @example
 * range(1, 5) => [1, 2, 3, 4]
 * range(3) => [0, 1, 2]
 */
export const range = (start: number, end?: number): number[] => {
  const length = end ? end - start : start
  const _startIdx = end ? start : 0

  return Array.from({ length }, (_, k) => k + _startIdx)
}

/**
 * Generates an array of unique random numbers, can be within a specified range.
 *
 * @param {number} length - The length of the array.
 * @param {Object} [range] - The range of the numbers in the array (optional).
 * @param {number} range.start - The starting value of the range (inclusive).
 * @param {number} range.end - The ending value of the range (exclusive).
 * @param {number[]} [distinctFrom] - An array of numbers that the random numbers should not be (optional).
 * @returns {number[]} An array containing the random numbers.
 *
 * @example
 * uniqueRandomArray({ length: 3 }) => [0.32, 0.51, 0.19]
 * uniqueRandomArray({ length: 3, range: { start: 1, end: 5 } }) => [1, 3, 4]
 * uniqueRandomArray({ length: 3, range: { start: 0, end: 5 }, distinctFrom: [1, 2] }) => [0, 3, 4]
 */
export const uniqueRandomArray = ({
  length,
  range,
  distinctFrom,
}: {
  length: number
  range?: { start: number; end: number }
  distinctFrom?: number[]
}): number[] => {
  const arr: number[] = []

  while (arr.length < length) {
    if (range) {
      const newRandom = Math.floor(Math.random() * range.end + range.start)
      const canAdd =
        !arr.includes(newRandom) && !distinctFrom?.includes(newRandom)

      if (canAdd) {
        arr.push(newRandom)
      }
    } else {
      const newRandom = parseInt(Math.random().toPrecision(2))
      const canAdd =
        !arr.includes(newRandom) && !distinctFrom?.includes(newRandom)

      if (canAdd) {
        arr.push(newRandom)
      }
    }
  }

  return arr
}
