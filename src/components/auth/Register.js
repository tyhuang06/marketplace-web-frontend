import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
	RadioGroup,
	Radio,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import StoreService from '../../services/StoreService';

const Register = () => {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	// User input fields
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmpassword, setConfirmpassword] = useState();
	const [username, setUsername] = useState();
	const [role, setRole] = useState();

	// Store input fields
	const [storeName, setStoreName] = useState();
	const [storeDescription, setStoreDescription] = useState();

	const navigate = useNavigate();
	const toast = useToast();

	const handleClick = () => setShow(!show);

	const handleSubmit = async () => {
		setLoading(true);

		if (!username || !email || !password || !confirmpassword) {
			toast({
				title: 'Please fill in all the fields',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}

		if (password !== confirmpassword) {
			toast({
				title: 'Passwords do not match',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}

		// Register user
		const newUser = {
			username,
			email,
			password,
		};

		switch (role) {
			case 'seller':
				newUser.isSeller = true;
				break;
			case 'admin':
				newUser.isAdmin = true;
				break;
			default:
				break;
		}

		const user = await AuthService.register(newUser)
			.then((res) => {
				toast({
					title: 'Registration success!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				return res;
			})
			.catch((err) => {
				toast({
					title: 'Error!',
					description: err.response.data,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
				setLoading(false);
			});

		// Login user
		await AuthService.login({
			email,
			password,
		})
			.then((res) => {
				localStorage.setItem('userInfo', JSON.stringify(res));
			})
			.catch((err) => {
				toast({
					title: 'Error!',
					description: err.response.data,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
				setLoading(false);
			});

		// Create store
		// Prompt to create store if user is a seller
		if (role === 'seller') {
			await StoreService.createStore({
				ownerId: user._id,
				storeName,
				storeDescription,
			})
				.then((res) => {
					toast({
						title: 'Store created!',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});

					setLoading(false);
					navigate('/');
				})
				.catch((err) => {
					toast({
						title: 'Error!',
						description: err.response.data,
						status: 'error',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
				});
		} else {
			setLoading(false);
			navigate('/');
		}
	};

	return (
		<div className="p-2">
			<FormControl id="username" isRequired className="mb-2">
				<FormLabel>Username</FormLabel>
				<Input
					placeholder="Enter Your Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</FormControl>

			<FormControl id="email" isRequired className="mb-2">
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="Enter Your Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>

			<FormControl id="password" isRequired className="mb-2">
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="Enter Your Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement>
						<button
							className="w-full h-full flex items-center justify-center rounded-lg"
							onClick={handleClick}
						>
							{show ? (
								<EyeSlashIcon className="w-5 h-5 text-slate-700" />
							) : (
								<EyeIcon className="w-5 h-5 text-slate-700" />
							)}
						</button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="confirm_password" isRequired className="mb-2">
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmpassword(e.target.value)}
					/>
					<InputRightElement>
						<button
							className="w-full h-full flex items-center justify-center rounded-lg"
							onClick={handleClick}
						>
							{show ? (
								<EyeSlashIcon className="w-5 h-5 text-slate-700" />
							) : (
								<EyeIcon className="w-5 h-5 text-slate-700" />
							)}
						</button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="role" isRequired className="mb-2">
				<FormLabel>User Role</FormLabel>
				<RadioGroup onChange={setRole} value={role}>
					<Stack direction="row">
						<Radio value="buyer">Buyer</Radio>
						<Radio value="seller">Seller</Radio>
						<Radio value="admin">Admin</Radio>
					</Stack>
				</RadioGroup>
			</FormControl>

			{role === 'seller' && (
				<>
					<FormControl id="storeName" isRequired className="mb-2">
						<FormLabel>Store Name</FormLabel>
						<Input
							placeholder="Create a Store Name"
							onChange={(e) => setStoreName(e.target.value)}
						/>
					</FormControl>

					<FormControl
						id="storeDescription"
						isRequired
						className="mb-2"
					>
						<FormLabel>Store Description</FormLabel>
						<Textarea
							placeholder="Enter Your Store Description"
							onChange={(e) =>
								setStoreDescription(e.target.value)
							}
						/>
					</FormControl>
				</>
			)}

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={handleSubmit}
				isLoading={loading}
			>
				Sign Up
			</Button>
		</div>
	);
};

export default Register;
