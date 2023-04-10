import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
} from '@chakra-ui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const Login = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const toast = useToast();

	const handleClick = () => setShow(!show);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!email || !password) {
			toast({
				title: 'Error',
				description: 'Please fill all the fields',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}

		await AuthService.login({ email, password })
			.then((res) => {
				toast({
					title: 'Login Success!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				localStorage.setItem('userInfo', JSON.stringify(res));
				setLoading(false);
				navigate('/');
			})
			.catch((err) => {
				toast({
					title: 'Error',
					description: err.response.data,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
				setLoading(false);
			});
	};

	return (
		<div className="p-2">
			<FormControl id="emailLogin" isRequired className="mb-2">
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="Enter Your Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>

			<FormControl id="passwordLogin" isRequired className="mb-2">
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
			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={handleSubmit}
				isLoading={loading}
			>
				Login
			</Button>
		</div>
	);
};

export default Login;
