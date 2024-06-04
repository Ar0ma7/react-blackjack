/** grid-template用のstringを取得 */
export const getGridTemplate = (
  areas: string[][],
  rows?: string[],
  columns?: string[]
): string => {
  const areasOnly = !(rows && columns);

  const templates = areas.map((row, index) => {
    let gridAreaRow = `"${row.join(' ')}"`;

    if (areasOnly) {
      return gridAreaRow;
    }

    if (rows[index]) {
      gridAreaRow = `${gridAreaRow} ${rows[index]}`;
    }

    return gridAreaRow;
  });

  if (!areasOnly) {
    templates.push(` / ${columns.join(' ')}`);
  }

  return templates.join('\n');
};
