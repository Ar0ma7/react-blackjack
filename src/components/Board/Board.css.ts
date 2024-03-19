import { css } from '@emotion/react';

type GridArea = 'dealerArea' | 'center' | 'playerArea';

const gridTemplateAreas: GridArea[][] = [
  ['dealerArea'],
  ['center'],
  ['playerArea'],
];
const gridTemplateAreasString = gridTemplateAreas
  .map((row) => `"${row.join(' ')}"`)
  .join('\n');

export const styles = {
  wrapper: css`
    display: grid;
    grid-template-areas: ${gridTemplateAreasString};
    grid-template-rows: 40% 20% 40%;
    grid-template-columns: auto;
    width: 100vw;
    height: 100vh;
  `,
  playerBoard: (gridArea: GridArea) => css`
    outline: 1px solid;
    grid-area: ${gridArea};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 40px;
    overflow-x: auto;
  `,
  centerBoard: css`
    grid-area: 'center';
    text-align: center;
    align-self: center;
  `,
};
