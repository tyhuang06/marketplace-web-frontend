import React, { useState, useEffect } from 'react';
import { Button, Container, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import BuyerProfile from '../../components/user/BuyerProfile';
import SellerProfile from '../../components/user/SellerProfile';
import EditProfileModal from '../../components/user/EditProfileModal';
import { UserState } from '../../context/UserProvider';

const ProfilePage = () => {
	const { user, setUser } = UserState();
	const [profileUser, setProfileUser] = useState({});
	const [isFollowing, setIsFollowing] = useState(true);
	const [isSelf, setIsSelf] = useState(false);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const toast = useToast();

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

	useEffect(() => {
		if (user && profileUser) {
			setIsFollowing(user.following.includes(profileUser._id));
		}

		if (user && profileUser) {
			setIsSelf(user._id === profileUser._id);
		}
	}, [user, profileUser]);

	const handleFollow = () => {
		UserService.followUser(id)
			.then((res) => {
				toast({
					title: 'User Followed!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				localStorage.setItem('userInfo', JSON.stringify(res));
				setUser(res);
			})
			.catch((err) => {
				toast({
					title: 'Error Following User',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	const handleUnfollow = () => {
		UserService.unfollowUser(id)
			.then((res) => {
				toast({
					title: 'User Unfollowed!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				localStorage.setItem('userInfo', JSON.stringify(res));
				setUser(res);
			})
			.catch((err) => {
				toast({
					title: 'Error Unfollowing User',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	return (
		<>
			{!loading && (
				<Container>
					{isSelf && <EditProfileModal profileUser={profileUser} />}
					{!isSelf && !isFollowing && (
						<Button onClick={handleFollow} className="mb-2">
							Follow
						</Button>
					)}
					{!isSelf && isFollowing && (
						<Button onClick={handleUnfollow} className="mb-2">
							Unfollow
						</Button>
					)}
					{profileUser.isSeller ? (
						<SellerProfile
							profileUser={profileUser}
							isSelf={isSelf}
						/>
					) : (
						<BuyerProfile
							profileUser={profileUser}
							isSelf={isSelf}
						/>
					)}
				</Container>
			)}
		</>
	);
};

export default ProfilePage;
