import React from 'react';
import { Grid as MUIGrid, type GridProps } from '@mui/material';

// Re-export wrapper with proper typing
const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => (
  <MUIGrid ref={ref} {...props} component="div" />
));

Grid.displayName = 'Grid';

export { Grid };
