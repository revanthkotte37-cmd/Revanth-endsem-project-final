import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface AuditLog {
	timestamp: string;
	action: string;
	user: string;
	details: string;
}

const mockAuditLogs: AuditLog[] = [
	{
		timestamp: new Date().toISOString(),
		action: 'User Creation',
		user: 'admin@example.com',
		details: 'Created new investor account',
	},
	{
		timestamp: new Date(Date.now() - 86400000).toISOString(),
		action: 'Fund Update',
		user: 'admin@example.com',
		details: 'Updated fund performance metrics',
	},
];

const AuditLogComponent: React.FC = () => {
	return (
		<Paper elevation={2} sx={{ p: 2 }}>
			<Typography variant="h6" gutterBottom>
				System Audit Log
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Timestamp</TableCell>
							<TableCell>Action</TableCell>
							<TableCell>User</TableCell>
							<TableCell>Details</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{mockAuditLogs.map((log, index) => (
							<TableRow key={index}>
								<TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
								<TableCell>{log.action}</TableCell>
								<TableCell>{log.user}</TableCell>
								<TableCell>{log.details}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default AuditLogComponent;
