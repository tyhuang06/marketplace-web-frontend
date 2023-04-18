import {
	Card,
	Flex,
	Avatar,
	Box,
	Heading,
	Text,
	CardBody,
	Link,
} from '@chakra-ui/react';
import React from 'react';
import { Link as ReachLink } from 'react-router-dom';

const FollowList = (props) => {
	const { users } = props;

	return (
		<>
			{users.length === 0 && <Text>No users found</Text>}
			{users.map((targetUser) => (
				<Card key={targetUser._id} className="mb-2">
					<CardBody>
						<Flex
							flex="1"
							gap="4"
							alignItems="center"
							flexWrap="wrap"
						>
							<Avatar
								name={targetUser.username}
								src={targetUser.profilePic}
							/>

							<Box>
								<Heading size="md">
									{targetUser.username}
								</Heading>
								<Link
									as={ReachLink}
									to={`/profile/${targetUser._id}`}
									className=""
									color="blue.600"
								>
									<Text>Link to Profile</Text>
								</Link>
							</Box>
						</Flex>
					</CardBody>
				</Card>
			))}
		</>
	);
};

export default FollowList;
