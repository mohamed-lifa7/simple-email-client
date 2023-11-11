'use client';

import { SearchIcon } from '@/components/icons/search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';

export function Search() {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('q', term);
		} else {
			params.delete('q');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className='relative flex flex-1 flex-shrink-0'>
			<label
				htmlFor='search'
				className='sr-only'>
				Search
			</label>
			<Input
				className='pl-10'
				placeholder='Search...'
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get('q')?.toString()}
			/>
			<SearchIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground ' />
		</div>
	);
}
