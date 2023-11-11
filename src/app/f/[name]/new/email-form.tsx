'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { sendEmail } from '@/lib/db/actions';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserEmail } from '@/types';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
	email: z.string({
		required_error: 'Receiver is required.',
	}),
	subject: z.string({
		required_error: 'Subject is required.',
	}),
	body: z.string({
		required_error: 'Body is required.',
	}),
});
function onSubmit(data: z.infer<typeof FormSchema>) {
	sendEmail(data)
		.then(() => {
			toast({
				title: 'Email Sent',
				description: 'Your email has been sent successfully.',
			});
		})
		.catch(() => {
			toast({
				variant: 'destructive',
				title: 'Error Sending Email',
				description:
					'There was an error sending your email. Please try again.',
			});
		});
}
export function Compose({ userEmails }: { userEmails: UserEmail[] }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (
			(e.ctrlKey || e.metaKey) &&
			(e.key === 'Enter' || e.key === 'NumpadEnter')
		) {
			e.preventDefault();
			e.currentTarget.form?.requestSubmit();
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='col-span-5 space-y-6 relative'>
				<Button
					className='ml-auto sticky top-0 '
					variant='ghost'
					size='icon'
					type='submit'>
					<Send />
				</Button>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<>
							<FormItem className='flex flex-col'>
								<FormLabel>to: </FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant='outline'
												role='combobox'
												className={cn(
													'justify-between',
													!field.value && 'text-muted-foreground',
												)}>
												{field.value
													? userEmails.find(
															(user) =>
																user.email === field.value,
													  )?.email
													: 'Select email'}
												<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='p-0'>
										<Command>
											<CommandInput
												placeholder='Search email...'
												className='h-9'
											/>
											<CommandEmpty>No Email found.</CommandEmpty>
											<CommandGroup>
												{userEmails.map((user) => (
													<CommandItem
														value={user.email}
														key={user.email}
														onSelect={() => {
															form.setValue('email', user.email);
														}}>
														{user.email}
														<CheckIcon
															className={cn(
																'ml-auto h-4 w-4',
																user.email === field.value
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={form.control}
					name='subject'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Input
									placeholder='Meeting'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='body'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									rows={20}
									required
									onKeyDown={handleKeyDown}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
