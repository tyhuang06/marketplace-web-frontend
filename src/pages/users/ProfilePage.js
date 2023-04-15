import React, { useState, useEffect } from 'react';
import { Button, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import BuyerProfile from '../../components/user/BuyerProfile';
import SellerProfile from '../../components/user/SellerProfile';

const ProfilePage = () => {
	const [profileUser, setProfileUser] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const selfProfile = !id;

	useEffect(() => {
		if (id) {
			UserService.getUserById(id)
				.then((res) => {
					setProfileUser(res);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// current user
			UserService.getCurrentUser()
				.then((res) => {
					setProfileUser(res);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [id]);

	return (
		<Container>
			{selfProfile && (
				<Button colorScheme="blue" variant="ghost" className="mb-2">
					Edit Profile
				</Button>
			)}
			{!loading && profileUser.isSeller ? (
				<SellerProfile profileUser={profileUser} isSelf={selfProfile} />
			) : (
				<BuyerProfile profileUser={profileUser} isSelf={selfProfile} />
			)}
		</Container>
	);
};

export default ProfilePage;
