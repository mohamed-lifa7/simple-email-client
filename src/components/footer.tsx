import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
	return (
		<div className='container my-10 text-muted-foreground flex items-center'>
			built by{' '}
			<Button
				asChild
				className='underline'
				variant='link'>
				<Link
					locale={false}
					href='https://mohamed-lifa7.vercel.app/'>
					Mohamed Lifa
				</Link>
			</Button>
			.{' '}
			<p>
				The source code is available on{' '}
				<Button
					asChild
					className='underline'
					variant='link'>
					<Link
						locale={false}
						href='https://github.com/Mohamed-lifa7/simple-email-client'>
						GitHub
					</Link>
				</Button>
				.
			</p>
		</div>
	);
};

export default Footer;
