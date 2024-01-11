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
 *
 * range(3) => [0, 1, 2]
 */
export const range = (start: number, end?: number): number[] => {
  const length = end ? end - start : start
  const _startIdx = end ? start : 0

  // return [...Array(length).keys()]
  return Array.from({ length }, (_, k) => k + _startIdx)
}
