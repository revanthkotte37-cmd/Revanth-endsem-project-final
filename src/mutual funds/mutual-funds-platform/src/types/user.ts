export type UserRole = 'admin' | 'investor' | 'advisor' | 'analyst';

export interface User {
	id: string;
	email: string;
	role: UserRole;
	name?: string;
	createdAt?: Date;
}
