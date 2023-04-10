import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo) {
			setUser(userInfo);
		} else {
			navigate('/login');
		}
	}, [navigate]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
