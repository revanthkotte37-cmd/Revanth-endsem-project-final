import React from 'react';
import { Grid as MUIGrid } from '@mui/material';
import type { GridProps } from '@mui/material';

interface CustomGridProps extends Omit<GridProps, 'ref'> {
  children?: React.ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  xs?: number | boolean;
  sm?: number | boolean;
  md?: number | boolean;
  lg?: number | boolean;
  xl?: number | boolean;
}

const Grid = React.forwardRef<HTMLDivElement, CustomGridProps>((props, ref) => (
  <MUIGrid {...props} ref={ref} />
));

Grid.displayName = 'Grid';

export { Grid };