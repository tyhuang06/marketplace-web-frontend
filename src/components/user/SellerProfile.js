import React from 'react';
import {
	Avatar,
	Box,
	Container,
	Heading,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Button,
	Stack,
	Text,
} from '@chakra-ui/react';

const SellerProfile = (props) => {
	const { profileUser, isSelf } = props;

	return (
		<Container>
			<Box className="flex items-center p-2 bg-slate-50">
				<Avatar
					size="xl"
					name={profileUser.username}
					src={profileUser.profilePic}
				/>
				<Stack className="ml-8">
					<Heading>{profileUser.username}</Heading>
					{isSelf && <Text>{profileUser.email}</Text>}
				</Stack>

				{isSelf && (
					<div className="ml-auto">
						<Button colorScheme="blue" variant="ghost">
							Edit Profile
						</Button>
					</div>
				)}
			</Box>

			<Box className="mt-8">
				<Tabs isFitted>
					<TabList>
						<Tab>Products</Tab>
						<Tab>Reviews</Tab>
						<Tab>Followers</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>products list</p>
						</TabPanel>
						<TabPanel>
							<p>reviews</p>
						</TabPanel>
						<TabPanel>
							<p>Followers</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default SellerProfile;
