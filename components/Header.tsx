import logo from '@/images/logo.jpeg'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'
import Container from './Container'

const Header = () => {
	return (
		<header className='w-full bg-white py-4 border-b border-b-gray-400'>
			<Container className='flex items-center justify-between gap-5'>
				<Link href={'/'}>
					<Image src={logo} alt='logo' priority width={80} height={60} />
				</Link>
				<Form action='/search' className='flex-1 border border-black'>
					<input
						type='text'
						name='query'
						placeholder='Search for products'
						className='w-full border-2 border-gray-200 px-4 py-2.5 rounded-md focus-visible:border-darkBlue outline-none'
					/>
				</Form>
				<div className=''>tabs</div>
			</Container>
		</header>
	)
}
export default Header
