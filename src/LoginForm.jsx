// src/LoginForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { doLogin } from './Components/Auth';
import NavBar from './Components/NavBar';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { doLoginPost } from './Components/Hooks';
import { useToast } from '@chakra-ui/react';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();

  const navigate=useNavigate();

  const mutation = useMutation({
    mutationFn:doLoginPost,
    onSuccess: (data) => {
       doLogin(data,()=>{
          navigate("/");
       })
      toast({
        title: "Login successful.",
        description: `Welcome back, ${data}!`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      
    },
    onError: (error) => {
      toast({
        title: "Login failed.",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
});

  const onSubmit =  (data) => {
      mutation.mutate(data)
  };
  
 



  return (
     <><NavBar/>
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box
        maxW="md"
        w="full"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="xl"
        rounded="lg"
        p={6}
        my={12}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Heading fontSize="2xl">Sign in to your account</Heading>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            <Stack spacing={6}>
              <Button
                type="submit"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={mutation.isLoading}
              >
                Sign in
              </Button>
              <Text align="center">
                Don't have an account? <Button variant="link" colorScheme="blue">Sign up</Button>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
    </>
  );
};

export default LoginForm;
