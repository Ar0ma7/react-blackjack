import { css } from '@emotion/react';
import { getGridTemplate } from '@/utils/styleUtil';

type GridArea =
  | 'Title'
  | 'GoldLabel'
  | 'Gold'
  | 'SliderLabel'
  | 'Slider'
  | 'StartButton';
const gridTemplateAreas: GridArea[][] = [
  ['Title', 'Title'],
  ['GoldLabel', 'Gold'],
  ['SliderLabel', 'Slider'],
  ['StartButton', 'StartButton'],
];
const gridTemplateRows = ['auto', 'auto', 'auto', 'auto'];
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
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template: ${gridTemplateString};
    gap: 40px 10px;
    background: #fff;
    padding: 20px 40px;
    border-radius: 5px;
    width: 400px;
  `,
  startViewItem: (gridArea: GridArea) => css`
    grid-area: ${gridArea};
  `,
  title: css`
    font-size: 32px;
    font-weight: bold;
    grid-area: Title;
    position: relative;
    width: 100%;
    overflow: hidden;
  `,
  logo: css`
    display: block;
    width: 300px;
    height: auto;
    margin: 0 auto;
  `,
  titleInner: css`
    position: relative;
    ::after {
      content: '';
      display: block;
      width: 100%;
      height: 4px;
      background: repeating-linear-gradient(
        90deg,
        red 0%,
        red 10%,
        black 10%,
        black 20%
      );
      position: absolute;
      bottom: 0;
    }
  `,
  label: css`
    text-align: right;
    justify-self: end;
    font-weight: bold;
    padding-right: 1em;
  `,
  gold: css`
    grid-area: Gold;
    font-size: 20px;
    font-weight: bold;
  `,
  goldInfo: css`
    display: grid;
    grid-template: auto auto / 4em auto;
    gap: 2px;
    color: #fff;
    font-weight: bold;
  `,
  buttonWrapper: css`
    position: absolute;
    right: 40px;
    bottom: 40px;
  `,
  button: css`
    width: 150px;
  `,
  reset: css`
    display: inline-block;
    text-align: center;
    margin: 10px auto 0;
    cursor: pointer;
  `,
};
