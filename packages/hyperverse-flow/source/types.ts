export type FlowUser = {
	f_type: 'User';
	f_vsn: '1.0.0';
	addr: string;
	cid: string;
	loggedIn: boolean;
	expiresAt: Date;
	services: [];
} | null;
