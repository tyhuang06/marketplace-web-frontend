import React from 'react';
import {
	Avatar,
	Box,
	Heading,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Stack,
	Text,
} from '@chakra-ui/react';
import FollowList from './FollowList';

const BuyerProfile = (props) => {
	const { profileUser, isSelf } = props;

	return (
		<>
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
			</Box>

			<Box className="mt-8">
				<Tabs isFitted>
					<TabList>
						<Tab>Following</Tab>
						<Tab>Followers</Tab>
						<Tab>Reviews</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<FollowList users={profileUser.following} />
						</TabPanel>
						<TabPanel>
							<FollowList users={profileUser.followers} />
						</TabPanel>
						<TabPanel>
							<p>reviews</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</>
	);
};

export default BuyerProfile;
