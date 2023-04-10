import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/search/${search}`);
	};
	return (
		<InputGroup size="md" className="mb-4">
			<Input
				pr="5rem"
				type="text"
				placeholder="Search for products"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<InputRightElement width="4.5rem">
				<Button
					h="1.75rem"
					size="md"
					className="mr-2"
					onClick={handleSearch}
				>
					Search
				</Button>
			</InputRightElement>
		</InputGroup>
	);
};

export default SearchBox;
