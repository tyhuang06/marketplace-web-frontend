import React from 'react';
import {
	Box,
	Flex,
	HStack,
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuGroup,
	MenuDivider,
	useDisclosure,
	Stack,
	useToast,
	Avatar,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Bars3Icon,
	XMarkIcon,
	ChevronDownIcon,
	DocumentTextIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import {
	UserCircleIcon,
	ArrowLeftOnRectangleIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid';
import AuthService from '../services/AuthService';
import { UserState } from '../context/UserProvider';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
	// Links for the navbar
	const Links = [
		{ name: 'All Products', href: '/' },
		{ name: 'View Sellers', href: '#' },
		{ name: 'About', href: '#' },
	];

	const NavLink = ({ children }) => (
		<Link
			className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
			to={children.href}
		>
			{children.name}
		</Link>
	);

	const { user } = UserState();
	const userInfo = user;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();

	const handleLogout = async () => {
		await AuthService.logout()
			.then((res) => {
				localStorage.removeItem('userInfo');
				toast({
					title: 'Logout Success!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
				navigate('/');
			})
			.catch((err) => {
				toast({
					title: 'Error',
					description: err,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	return (
		<>
			<Box className="px-4 mb-8" bg="gray.100">
				<Flex
					h={14}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<IconButton
						size={'md'}
						icon={
							isOpen ? (
								<XMarkIcon className="w-8 h-8" />
							) : (
								<Bars3Icon className="w-8 h-8" />
							)
						}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
						className="flex items-center justify-center"
					/>
					<HStack
						spacing={8}
						alignItems={'center'}
						className="text-xl"
					>
						<Box className="font-bold">Used Marketplace</Box>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{Links.map((link) => (
								<NavLink key={link.name}>{link}</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<Menu>
							{userInfo ? (
								<MenuButton
									as={Button}
									cursor={'pointer'}
									leftIcon={
										<Avatar
											size="sm"
											name={userInfo.username}
											src={userInfo.profilePic}
										/>
									}
									rightIcon={
										<ChevronDownIcon className="w-4 h-4" />
									}
									className="focus:outline-none rounded-full nav-user-btn"
								>
									{userInfo.username}
								</MenuButton>
							) : (
								<MenuButton
									as={Button}
									cursor={'pointer'}
									leftIcon={
										<UserCircleIcon className="w-8 h-8" />
									}
									rightIcon={
										<ChevronDownIcon className="w-4 h-4" />
									}
									className="focus:outline-none rounded-full nav-user-btn"
								>
									Guest
								</MenuButton>
							)}
							<MenuList>
								{userInfo ? (
									<MenuGroup title="Profile">
										<Link to="/profile">
											<MenuItem
												icon={
													<UserIcon className="w-6 h-6" />
												}
											>
												My Profile
											</MenuItem>
										</Link>
										<Link to="/orders">
											<MenuItem
												icon={
													<DocumentTextIcon className="w-6 h-6" />
												}
											>
												My Orders
											</MenuItem>
										</Link>
									</MenuGroup>
								) : null}

								<MenuDivider />
								{userInfo ? (
									<MenuItem
										icon={
											<ArrowLeftOnRectangleIcon className="w-6 h-6" />
										}
										onClick={handleLogout}
									>
										Log Out
									</MenuItem>
								) : (
									<Link to="/login">
										<MenuItem
											icon={
												<ArrowRightOnRectangleIcon className="w-6 h-6" />
											}
										>
											Log In / Register
										</MenuItem>
									</Link>
								)}
							</MenuList>
						</Menu>
						{userInfo ? (
							<Link to="/cart" className="flex items-center ml-2">
								<ShoppingCartIcon className="w-8 h-8 mr-2" />
								Cart
							</Link>
						) : null}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link.name}>{link}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default Navbar;
