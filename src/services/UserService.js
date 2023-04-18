import { axiosDefault, jsonConfig } from '../axios';

const getCurrentUser = async () => {
	const response = await axiosDefault.get('/user');
	return response.data;
};

const getUserById = async (id) => {
	const response = await axiosDefault.get(`/user/${id}`);
	return response.data;
};

const updateCurrentUser = async (user) => {
	const response = await axiosDefault.put('/user', user, jsonConfig);
	return response.data;
};

const followUser = async (targetUserId) => {
	const response = await axiosDefault.post(
		'/user/follow',
		{ targetUserId },
		jsonConfig
	);
	return response.data;
};

const unfollowUser = async (targetUserId) => {
	const response = await axiosDefault.post(
		'/user/unfollow',
		{ targetUserId },
		jsonConfig
	);
	return response.data;
};

const UserService = {
	getCurrentUser,
	getUserById,
	followUser,
	unfollowUser,
	updateCurrentUser,
};

export default UserService;
