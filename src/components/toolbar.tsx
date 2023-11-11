'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { deleteEmail } from '@/lib/db/actions';
import { Search } from './search';
import { ThemeToggle } from './theme/theme-toggle';
import { Button } from './ui/button';
import { Forward, MailPlus, Reply, Trash2 } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Separator } from './ui/separator';

type Params = {
	name: string;
};

export function Toolbar() {
	const params: Params = useParams();
	const searchParams = useSearchParams();
	const emailId = searchParams.get('id');

	return (
		<>
			<div className='flex justify-between items-center py-4 px-2 sticky top-0 h-[60px]'>
				<div className='space-x-1'>
					<Button
						asChild
						variant='ghost'
						size='icon'>
						<Link href={`/f/${params.name}/new`}>
							<MailPlus />
						</Link>
					</Button>
					<form
						className='inline-flex'
						onSubmit={async (e) => {
							e.preventDefault();

							if (emailId) {
								await deleteEmail(params.name, emailId)
									.then(() => {
										toast({
											title: 'Email Deleted',
											description:
												'The email has been successfully deleted.',
										});
									})
									.catch(() => {
										toast({
											variant: 'destructive',
											title: 'Error Deleting Email',
											description:
												'There was an error deleting the email. Please try again.',
										});
									});
							}
						}}>
						<Button
							variant='ghost'
							size='icon'>
							<Trash2 />
						</Button>
					</form>
					<Button
						variant='ghost'
						size='icon'>
						<Reply />
					</Button>
					<Button
						variant='ghost'
						size='icon'>
						<Forward />
					</Button>
				</div>
				<div className='flex ml-auto space-x-2'>
					<ThemeToggle />
					<Search />
				</div>
			</div>
			<Separator />
		</>
	);
}

export function ToolbarSkeleton() {
	return (
		<div className='flex justify-between items-center border-b border-border py-4 px-2 sticky top-0 h-[60px]' />
	);
}
