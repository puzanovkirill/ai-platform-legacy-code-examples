import 'styled-components';

type TSize = {
  xs: string;
  s: string;
  l: string;
};

type TColor = {
  default: string;
  primary?: string;
  secondary?: string;
  hover?: string;
  contrast?: string;
  brand?: string;
  error?: string;
  success?: string;
  warning?: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    font: TSize;

    background: TColor;

    text: TColor;

    border: TColor;

    button: TColor;
    link: TColor;
  }
}
