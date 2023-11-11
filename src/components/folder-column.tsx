import Link from 'next/link';
import { getFoldersWithEmailCount } from '@/lib/db/queries';
import { Badge } from './ui/badge';
import { Flag, Folder, Inbox, Send } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import AddFolder from './add-folder';

export async function FolderColumn() {
	const { specialFolders, otherFolders } = await getFoldersWithEmailCount();

	return (
		<div className='border-r border-border  overflow-y-auto p-2 space-y-2'>
			<div className='space-y-2'>
				{specialFolders.map((folder, index) => (
					<Button
						asChild
						key={folder.name}
						variant='ghost'
						className='w-full flex items-center justify-between'>
						<Link
							key={index}
							href={`/f/${encodeURIComponent(
								folder.name.toLowerCase(),
							)}`}>
							<div className='flex items-center space-x-3 py-2'>
								{folder.name === 'Inbox' ? (
									<Inbox />
								) : folder.name === 'Flagged' ? (
									<Flag />
								) : (
									<Send />
								)}
								<span className='text-sm'>{folder.name}</span>
							</div>
							<Badge variant='secondary'>{folder.email_count}</Badge>
						</Link>
					</Button>
				))}
			</div>
			<Separator />
			<div className='space-y-2'>
				{otherFolders.map((folder, index) => (
					<Button
						asChild
						key={folder.name}
						variant='ghost'
						className='w-full justify-start flex items-center space-x-3'>
						<Link
							key={index}
							href={`/f/${encodeURIComponent(
								folder.name.toLowerCase(),
							)}`}>
							<Folder />
							<span className='text-sm ml-2'>{folder.name}</span>
						</Link>
					</Button>
				))}
			</div>
			<Separator />
			<AddFolder />
		</div>
	);
}
