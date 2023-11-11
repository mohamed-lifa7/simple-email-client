import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
	title: 'Simple Email Client',
	description:
		'A lightweight email client built with Next.js and Vercel Postgres.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			suppressHydrationWarning
			lang='en'
			className=''>
			<body className={`${GeistSans.variable}`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<main className='container'>{children}</main>
					<Separator />
					<Footer />
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
