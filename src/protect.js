const handleAuthError = (err, navigate) => {
	if (err.response.status === 401) {
		localStorage.removeItem('userInfo');
		navigate('/login');
	}
};

export default handleAuthError;
