import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UsedProductService from '../../services/UsedProductService';

const CreateUsedProductModal = ({ product }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [name, setName] = useState(product.name);
	const [sellingPrice, setSellingPrice] = useState(0);
	const [condition, setCondition] = useState('');
	const [size, setSize] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const toast = useToast();

	const format = (val) => `$` + val;
	const parse = (val) => val.replace(/^\$/, '');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const usedProduct = {
			name,
			asosId: product.id,
			sellingPrice,
			condition,
			size,
		};

		await UsedProductService.createUsedProduct(usedProduct)
			.then((res) => {
				toast({
					title: 'Used Product Added!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				setLoading(false);
				navigate('/details/' + product.id);
			})
			.catch((err) => {
				toast({
					title: 'Error',
					description: err.response.data.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				setLoading(false);
			});
	};

	return (
		<>
			<Button
				variant="ghost"
				colorScheme="blue"
				className="ml-2"
				onClick={onOpen}
			>
				Add to Store
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Used Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl id="name" isRequired className="mb-2">
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="Name for your used product"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</FormControl>

						<FormControl
							id="sellingPrice"
							isRequired
							className="mb-2"
						>
							<FormLabel>Selling Price</FormLabel>
							<NumberInput
								onChange={(valueString) =>
									setSellingPrice(parse(valueString))
								}
								value={format(sellingPrice)}
								max={50}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>

						<FormControl id="size" isRequired className="mb-2">
							<FormLabel>Size</FormLabel>
							<Input
								placeholder="Size of your used product"
								onChange={(e) => setSize(e.target.value)}
								value={size}
							/>
						</FormControl>

						<FormControl id="condition" isRequired className="mb-2">
							<FormLabel>Condition</FormLabel>
							<Input
								placeholder="Condition of your used product"
								onChange={(e) => setCondition(e.target.value)}
								value={condition}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleSubmit}
							isLoading={loading}
						>
							Add to Store
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateUsedProductModal;
