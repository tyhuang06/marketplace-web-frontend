import React from 'react';
import {
	Container,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AuthPage = () => {
	return (
		<Container maxW="xl" className="flex flex-col items-center">
			<div className="flex bg-white w-full justify-center p-3 rounded-md h-fit mt-10 mb-5">
				<Text className="text-2xl">Account</Text>
			</div>
			<div className="flex bg-white w-full p-4 rounded-md">
				<Tabs variant="soft-rounded" className="w-full">
					<TabList className="mb-2 flex">
						<Tab className="w-full focus:shadow-none">Login</Tab>
						<Tab className="w-full focus:shadow-none">Register</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Register />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</Container>
	);
};

export default AuthPage;
