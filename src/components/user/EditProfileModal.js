import {
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const EditProfileModal = ({ profileUser }) => {
	const [profilePic, setProfilePic] = useState(profileUser.profilePic);

	const navigate = useNavigate();
	const toast = useToast();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSubmit = async (e) => {
		e.preventDefault();

		UserService.updateCurrentUser({
			profilePic,
		})
			.then((res) => {
				toast({
					title: 'User Profile Updated!',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});

				onClose();
				localStorage.setItem('userInfo', JSON.stringify(res));

				navigate(0);
			})
			.catch((err) => {
				toast({
					title: 'Error Updating User Profile',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			});
	};

	return (
		<>
			<Button
				onClick={onOpen}
				variant="ghost"
				colorScheme="blue"
				className="mb-2"
			>
				Edit Profile
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit User Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl
							id="profilePic"
							isRequired
							className="mb-2"
						>
							<FormLabel>Profile Pic Link</FormLabel>
							<Input
								placeholder="Enter Your Profile Pic Link"
								onChange={(e) => setProfilePic(e.target.value)}
								value={profilePic}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleSubmit}
						>
							Update
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

export default EditProfileModal;
