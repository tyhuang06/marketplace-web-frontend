import { axiosDefault, jsonConfig } from '../axios';

const createStore = async (store) => {
	const response = await axiosDefault.post('/store', store, jsonConfig);
	return response.data;
};

const getStoreById = async (id) => {
	const response = await axiosDefault.get(`/store/${id}`);
	return response.data;
};

const getStoreByOwnerId = async (id) => {
	const response = await axiosDefault.get(`/store/owner/${id}`);
	return response.data;
};

const updateStore = async (id, store) => {
	const response = await axiosDefault.put(`/store/${id}`, store, jsonConfig);
	return response.data;
};

const StoreService = {
	createStore,
	getStoreById,
	getStoreByOwnerId,
	updateStore,
};

export default StoreService;
