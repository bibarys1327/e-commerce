import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Ecommerce Website for Shoppers',
	description: 'Ecommerce website for educational purposes',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
