import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const DashboardLayout: React.FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
	return (
		<Box sx={{ p: 2 }}>
			{title && (
				<Typography variant="h5" gutterBottom>
					{title}
				</Typography>
			)}
			<Box>{children}</Box>
		</Box>
	);
};

export const DashboardCard: React.FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => (
	<Paper sx={{ p: 2, mb: 2 }}>
		{title && <Typography variant="h6">{title}</Typography>}
		<Box sx={{ mt: 1 }}>{children}</Box>
	</Paper>
);

export default DashboardLayout;
