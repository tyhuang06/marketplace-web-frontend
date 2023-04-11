import { axiosDefault, jsonConfig } from '../axios';

const getCurrentUser = async () => {
	const response = await axiosDefault.get('/user');
	return response.data;
};

const getUserById = async (id) => {
	const response = await axiosDefault.get(`/user/${id}`);
	return response.data;
};

const followSeller = async (sellerId) => {
	const response = await axiosDefault.post(
		'/user/follow',
		{ sellerId },
		jsonConfig
	);
	return response.data;
};

const unfollowSeller = async (sellerId) => {
	const response = await axiosDefault.post(
		'/user/unfollow',
		{ sellerId },
		jsonConfig
	);
	return response.data;
};

const UserService = {
	getCurrentUser,
	getUserById,
	followSeller,
	unfollowSeller,
};

export default UserService;
