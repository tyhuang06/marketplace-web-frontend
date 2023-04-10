import { axiosDefault, jsonConfig } from '../axios';

const createUsedProduct = async (usedProduct) => {
	const response = await axiosDefault.post(
		'/usedproduct',
		usedProduct,
		jsonConfig
	);
	return response.data;
};

const getUsedProductById = async (id) => {
	const response = await axiosDefault.get(`/usedproduct/${id}`);
	return response.data;
};

const updateUsedProduct = async (id, usedProduct) => {
	const response = await axiosDefault.put(
		`/usedproduct/${id}`,
		usedProduct,
		jsonConfig
	);
	return response.data;
};

const deleteUsedProduct = async (id) => {
	const response = await axiosDefault.delete(`/usedproduct/${id}`);
	return response.data;
};

const getUsedProductsByStoreId = async (storeId) => {
	const response = await axiosDefault.get(`/usedproduct/store/${storeId}`);
	return response.data;
};

const getUsedProductsByAsosId = async (asosId) => {
	const response = await axiosDefault.get(`/usedproduct/asos/${asosId}`);
	return response.data;
};

const UsedProductService = {
	createUsedProduct,
	getUsedProductById,
	updateUsedProduct,
	deleteUsedProduct,
	getUsedProductsByStoreId,
	getUsedProductsByAsosId,
};

export default UsedProductService;
