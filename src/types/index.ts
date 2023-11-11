type UserEmail = {
	first_name: string;
	last_name: string;
	email: string;
};
type EmailWithSender = {
	id: number;
	sender_id: number;
	recipient_id: number;
	subject: string;
	body: string;
	sent_date: Date;
	first_name: string;
	last_name: string;
	email: string;
};
type Folder = {
	name: string;
	email_count: string;
};

export type { UserEmail, EmailWithSender, Folder };
