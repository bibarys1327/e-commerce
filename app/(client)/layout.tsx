import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import {Toaster} from 'react-hot-toast'

const poppins = localFont({
	src:'../fonts/Poppins.woff2',
	variable: '--font-poppins',
	weight: '400',
	preload: false
})

export const metadata: Metadata = {
	title: 'Ecommerce Website for Shoppers',
	description: 'Ecommerce website for educational purposes',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider dynamic>
			<html lang='en'>
				<body
					className={`${poppins.variable} antialiased`}
				>
					<Header />
					{children}
					<Footer />
					<Toaster position='bottom-right' toastOptions={{
						style: {
							background: '#000000',
							color: '#FFFFFF'
						}
					}} />
				</body>
			</html>
		</ClerkProvider>
	)
}
