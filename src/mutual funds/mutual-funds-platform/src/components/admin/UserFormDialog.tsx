import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
}

const UserFormDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Add New User</DialogTitle>
			<DialogContent>
				<TextField fullWidth label="Name" margin="dense" />
				<TextField fullWidth label="Email" margin="dense" />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={() => onSubmit({})} variant="contained">Create</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UserFormDialog;
