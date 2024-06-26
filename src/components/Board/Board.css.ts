import { css } from '@emotion/react';
import { getGridTemplate } from '@/utils/styleUtil';

type GridArea = 'DealerArea' | 'Center' | 'PlayerArea';
const gridTemplateAreas: GridArea[][] = [
  ['DealerArea'],
  ['Center'],
  ['PlayerArea'],
];
const gridTemplateRows = ['40%', '1fr', '40%'];
const gridTemplateColumns = ['auto'];
const gridTemplateString = getGridTemplate(
  gridTemplateAreas,
  gridTemplateRows,
  gridTemplateColumns
);

export const styles = {
  wrapper: css`
    display: grid;
    grid-template: ${gridTemplateString};
    width: 100vw;
    height: 100vh;
    background: url('/image/bg.png');
  `,
  playerBoard: (gridArea: GridArea) => css`
    grid-area: ${gridArea};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 40px;
    overflow-x: auto;
  `,
  centerBoard: css`
    grid-area: Center;
    height: 100%;
    position: relative;
    overflow: hidden;
  `,
  centerBoardInner: css`
    display: grid;
    align-content: space-between;
    height: 100%;
    padding: 20px;
    text-align: center;
  `,
  number: css`
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    & + & {
      margin-top: 20px;
    }
  `,
  noticeWinner: (isShow: boolean) => css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    align-content: center;
    opacity: 0;
    ${isShow &&
    css`
      animation: fadeIn 3s;
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        8% {
          opacity: 1;
        }
        100% {
          opacity: 1;
        }
      }
    `}
  `,
  noticeMessage: (isShow: boolean) => css`
    color: #fff;
    font-weight: bold;
    font-style: italic;
    font-size: 50px;
    text-align: center;
    transform: translateX(-100%);
    opacity: 0;
    ${isShow &&
    css`
      animation: slideInLeft 3s;
      @keyframes slideInLeft {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        8% {
          transform: translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `}
  `,
};
