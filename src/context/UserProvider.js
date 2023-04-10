import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo) {
			setUser(userInfo);
		}
	}, [navigate]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserState = () => {
	return useContext(UserContext);
};

export default UserProvider;
