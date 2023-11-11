import { FolderColumn } from '@/components/folder-column';
import { Compose } from './email-form';
import { getAllEmailAddresses } from '@/lib/db/queries';

export default async function Page() {
	const userEmails = await getAllEmailAddresses();
	return (
		<div className='grid grid-cols-6 gap-2 h-screen p-2'>
			<FolderColumn />
			<Compose userEmails={userEmails} />
		</div>
	);
}
