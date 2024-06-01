import React from 'react';
import {
  Box, Flex, HStack, IconButton, Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack, useColorMode, useColorModeValue, Center
} from '@chakra-ui/react';
import NavBar from './NavBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { isLogin } from './Auth';
import ProductForm from './ProductForm';
import ActiveSaleTable from './ActiveSaleTable';

function Dashboard(props) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'gray');

  const [Login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(isLogin)
  })

  return (
    <div>
      <NavBar />
      <Box md:w="100%" display={{ base: 'flex-wrap', md: 'flex', }} m="auto" sm:px="20px" md:mx="auto" mt="20px" px={['10px', '30px', '60px']}>
        <HStack spacing="24px" display={{ base: 'flex', md: 'flex-wrap', }} fontSize={['sm', 'md', 'lg', 'xl']}   >
          <Button
            onClick={(e) =>
              Login  ? navigate("/activesale") : navigate("/loginForm")
            }
            colorScheme='teal' size={['sm', 'md']} >
            Active Sale Orders
          </Button>
          <Button
            onClick={(e) =>
              Login === true ? navigate("/completedsale") : navigate("/LoginForm")
            }
            colorScheme='teal' size={['sm', 'md',]} >
            Completed Sale Orders
          </Button>
        </HStack>
        <Button

          onClick={
            Login ? onOpen : (e) => navigate("/LoginForm")
          }

          colorScheme='teal' size={['sm', 'md',]} ml={['90px', '700px']} mt={['20px', '0px']}>
          + Sale Order
        </Button>
      </Box>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="800px"   bg={bgColor} color={color}>
          <ModalHeader>Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody my="1px" display="flex" justifyContent="center">
            <ProductForm />
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  );
}

export default Dashboard;