import React from 'react';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Menu,
  MenuButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { theme } from '@chakra-ui/react';
import NavBar from './NavBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { submitForm } from './ProductForm';




const data1 = [{
  "customer_id": 11908,
  "items": [
    {
      "sku_id": 220,
      "price": 12,
      "quantity": 17
    },
    {
        "sku_id": 221,
        "price": 13,
        "quantity": 15
      }
  ],
  "paid": false,
  "invoice_no": "Invoice - 1212121",
  "last_date": "8/5/2024"
}];

const storedData = localStorage.getItem('getData');
     
// Parsing JSON string back to object
  const parsedData = JSON.parse(storedData);
  console.log(parsedData.cutomerId)

function ActiveSaleTable() {
   
     const[getData,setGetData]=useState([]);
     const[orderData, setOrderData] = useState();
     
  
  
    const formData={
        
        price:'',
        quantity:'',
        invoice_date:'',
         paid:'',
         active_sale_order:''

     }

     const[id,setId]=useState(null);
      const[form,setForm]=useState(null);


  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const[data,setData]=useState(data1);



  const handleEditClick = (item) => {
    setSelectedItem({...item});
    onOpen();
  };

  const handleSave = (e) => {
    // Update the data with the new values from selectedItem
    setData(prevData =>
        prevData.map(order =>
          order.customer_id === selectedItem.customer_id ? { ...selectedItem } : order
        )
      );
      onClose();
    

    
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedItem(prevItem => ({
        ...prevItem,
        [name]: type === 'checkbox' ? checked : value
      }));
     
  
  };


  return (
     <ChakraProvider>
        <NavBar/> 
      <Box p={4}>
           <h1 style={{textAlign:"center",fontSize:'25px'}}>Active Sale order</h1>
        <Table variant="simple"  mt="30px" id="initial-data">
          <Thead>
            <Tr>
              <Th>Customer ID</Th>
              <Th>SKU ID</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Paid</Th>
              <Th>Invoice No</Th>
              <Th>Last Modified Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {parsedData.products.map((order, index) => (
                order.sku.map((item,index)=>(
              <Tr key={index}>
                {index === 0 && (
                  <Td rowSpan={order.sku.length}>{parsedData.cutomerId}</Td>
                )}
                <Td>{index+1}</Td>
                <Td>{item.selling_price}</Td>
                <Td>{item.quantity}</Td>
                {index === 0 && (
                  <>
                    <Td rowSpan={order.sku.length}>{parsedData.paid ? 'Yes' : 'No'}</Td>
                    <Td rowSpan={order.sku.length}>{123}</Td>
                    <Td rowSpan={order.sku.length}>{parsedData.invoice_date}</Td>
                  </>
                )}
                <Td>
                  <Menu>
                    <MenuButton as={IconButton} icon={<BiDotsVerticalRounded />} />
                    <MenuList>
                      <MenuItem onClick={() => handleEditClick(item)}>Edit</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))))}
          </Tbody>
        </Table>
        {selectedItem && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <FormControl>
                  <FormLabel>Customer ID</FormLabel>
                  <Input
                    name="customer_id"
                    value={form.customer_id}
                    onChange={handleChange}
                    isReadOnly
                  />
                </FormControl> */}

                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    value={selectedItem.price}
                    onChange={handleChange}
                   
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    name="quantity"
                    value={selectedItem.quantity}
                    onChange={handleChange}
                    
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Invoice No</FormLabel>
                  <Input
                    name="invoice_no"
                    value={selectedItem.invoice_no}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Invoice Date</FormLabel>
                  <Input
                    type="date"
                    name="invoice_date"
                    value={selectedItem.invoice_date}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Paid</FormLabel>
                  <Switch
                    name="paid"
                    isChecked={selectedItem.paid}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Active Sale Order</FormLabel>
                  <Switch
                    name="active_sale_order"
                    isChecked={selectedItem.active_sale_order}
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
      </ChakraProvider>
  );
}

export default ActiveSaleTable;
