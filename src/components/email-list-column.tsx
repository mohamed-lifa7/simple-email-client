import Link from 'next/link';
import { formatEmailString } from '@/lib/db/utils';
import { getEmailsForFolder } from '@/lib/db/queries';

export async function EmailListColumn({
	folderName,
	searchParams,
}: {
	folderName: string;
	searchParams: { q?: string; id?: string };
}) {
	const emails = await getEmailsForFolder(folderName, searchParams.q);

	function createUrl(id: number) {
		const baseUrl = `/f/${folderName.toLowerCase()}`;
		const params = new URLSearchParams(searchParams);
		params.set('id', id.toString());
		return `${baseUrl}?${params.toString()}`;
	}

	return (
		<div className='border-r border-border overflow-y-auto p-2 col-span-2'>
			<ul>
				{emails.map((email) => (
					<Link
						key={email.id}
						href={createUrl(email.id)}>
						<li className='p-2 hover:bg-muted cursor-pointer flex justify-between items-start rounded-lg'>
							<div className='w-full truncate'>
								<h2 className='text-base font-bold'>
									{formatEmailString(email)}
								</h2>
								<p className='text-sm text-muted-foreground'>
									{email.subject}
								</p>
								<p className='text-sm truncate overflow-ellipsis'>
									{email.body}
								</p>
							</div>
							<time className='text-xs text-muted-foreground self-center flex justify-end'>
								{new Date(email.sent_date).toLocaleDateString()}
							</time>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
