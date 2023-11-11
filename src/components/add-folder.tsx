'use client';

import { createNewFolder } from '@/lib/db/actions';
import { FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from './ui/use-toast';

const AddFolder = () => {
	const [folderName, setFolderName] = useState('Untitled');
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<FolderPlus className='h-4 w-4 mr-2' />
					Add new folder
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[400px]'>
				<DialogHeader>
					<DialogTitle>Add New Folder</DialogTitle>
					<DialogDescription>
						Please provide a name for the new folder.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label
							htmlFor='name'
							className='text-right'>
							Folder name
						</Label>
						<Input
							id='name'
							value={folderName}
							className='col-span-3'
							onChange={(e) => {
								setFolderName(e.target.value);
							}}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={() => {
							createNewFolder(folderName)
								.then(() => {
									toast({
										title: 'Success',
										description: 'Folder created successfully!',
									});
								})
								.catch((error) => {
									toast({
										variant: 'destructive',
										title: 'Error',
										description:
											'Error creating folder. Please try again.',
									});
								})
								.finally(() => {
									setIsOpen(false);
								});
						}}>
						Create Folder
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddFolder;
