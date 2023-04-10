import { axiosDefault, jsonConfig } from '../axios';

const register = async (user) => {
	const response = await axiosDefault.post(
		'/auth/register',
		user,
		jsonConfig
	);
	return response.data;
};

const login = async (user) => {
	const response = await axiosDefault.post('/auth/login', user, jsonConfig);
	return response.data;
};

const logout = async () => {
	const response = await axiosDefault.post('/auth/logout');
	return response.data;
};

const AuthService = {
	register,
	login,
	logout,
};

export default AuthService;
