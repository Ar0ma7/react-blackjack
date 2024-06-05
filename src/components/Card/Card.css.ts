import { css } from '@emotion/react';

export const styles = {
  card: css`
    aspect-ratio: 409 / 600;
    height: 100%;

    & + & {
      margin-left: -100px;
    }
  `,
  image: css`
    display: none;
    width: auto;
    height: 100%;
  `,
  isVisible: css`
    display: block;
  `,
};
