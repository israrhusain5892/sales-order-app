
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Stack, useColorMode, useColorModeValue, Center } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { isLogin } from './Auth';
import { useState } from 'react';
const Links = ['Home', 'About', 'Services', 'Contact',];
import { doLogout } from './Auth';
import { useNavigate } from 'react-router-dom';
const NavLink = ({ children }) => (
  <Button
    as="a"
    href={"/"}
    variant="ghost"
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}
  >
    {children}
  </Button>
);

const loginurl="/LoginForm"


const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  // const[login,setLogin]=useSate(false);
  const navigate=useNavigate();
  const [login,setLogin]=useState(false);

 useEffect(()=>{
     setLogin(isLogin);
 })

    const Logout=()=>{
         doLogout(()=>{
            navigate("/")
         })
         
    }
  
  return (
    <Box bg={useColorModeValue('white.100', 'white.900')} px={4} mt="0px" w="100%" boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box fontWeight="bold">Sales Dashboard</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
                  <NavLink  key={link}>{link}</NavLink>
                  
               ))}
             
          </HStack>
          
          
        </HStack>
        <Flex alignItems="center" gap="30px">
          <>
          {   
                 !login && 
                 <Box display={{md:'flex',base:'none'}} fontWeight="500" fontSize="18px"><Link  to={loginurl}>Login</Link></Box>
                 
             
          }
          {
                login && <Box display={{md:'flex',base:'none'}} fontWeight="500" fontSize="18px"><Button onClick={Logout}>Logout</Button></Box>
          }
          </>
         
        
          <Button onClick={toggleColorMode} mr={4} >
            {colorMode === 'light' ? <MoonIcon />   : <SunIcon />}
            {colorMode==='light' ? <p > Dark Mode</p> : <p>Light Mode</p>}
          </Button>
          
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' } } zIndex="40px">
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
              
            ))}
            <Box spacing={10}  textAlign="center" display={{md:'none'}} fontWeight="500" fontSize="19px" ><Link  to={loginurl}>Login</Link></Box>
          </Stack>
        </Box>
      ) : null}
    </Box>
     
  );
};

export default NavBar;
