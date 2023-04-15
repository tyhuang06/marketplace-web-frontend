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
import SellerProductsList from '../products/SellerProductsList';

const SellerProfile = (props) => {
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
						<Tab>Products</Tab>
						<Tab>Reviews</Tab>
						<Tab>Followers</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<SellerProductsList
								storeId={profileUser.storeInfo}
								isSelf={isSelf}
							/>
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
		</>
	);
};

export default SellerProfile;
