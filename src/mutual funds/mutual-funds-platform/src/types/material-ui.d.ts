import { ComponentProps } from 'react';
import { GridProps } from '@mui/material';

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
  }
}

declare module '@mui/material' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
  }
}