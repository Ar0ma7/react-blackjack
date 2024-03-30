/**
 * 数値配列の合計を返す
 */
export const sum = (array: number[]) =>
  array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

/**
 * 数値配列の最大値を返す
 */
export const max = (array: number[]) => {
  if (array.length === 0) {
    return undefined;
  }

  let max = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
};
