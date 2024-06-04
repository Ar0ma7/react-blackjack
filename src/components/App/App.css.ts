import { css } from '@emotion/react';
import { getGridTemplate } from '@/utills/styleUtil';

type GridArea = 'GoldLabel' | 'Gold' | 'SliderLabel' | 'Slider' | 'StartButton';
const gridTemplateAreas: GridArea[][] = [
  ['GoldLabel', 'Gold'],
  ['SliderLabel', 'Slider'],
  ['StartButton', 'StartButton'],
];
const gridTemplateRows = ['auto', 'auto', 'auto'];
const gridTemplateColumns = ['100px', '1fr'];
const gridTemplateString = getGridTemplate(
  gridTemplateAreas,
  gridTemplateRows,
  gridTemplateColumns
);

export const styles = {
  container: css`
    position: relative;
  `,
  startView: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template: ${gridTemplateString};
    gap: 40px 10px;
  `,
  startViewItem: (gridArea: GridArea) => css`
    grid-area: ${gridArea};
  `,
  label: css`
    text-align: right;
  `,
  buttonWrapper: css`
    position: absolute;
    right: 40px;
    bottom: 40px;
  `,
  button: css`
    width: 150px;
  `,
};
