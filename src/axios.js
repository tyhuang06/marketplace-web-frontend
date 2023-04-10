import axios from 'axios';

const rapidApi = axios.create({
	baseURL: process.env.REACT_APP_RAPID_API_URL,
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
	},
});

const axiosDefault = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

const jsonConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export { rapidApi, axiosDefault, jsonConfig };
