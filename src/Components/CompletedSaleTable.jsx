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
  
  MenuList,
  MenuItem,
  IconButton,
  theme
} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import NavBar from './NavBar';

// Example data with paid and unpaid entries
const data = [
  {
    "customer_id": 11908,
    "items": [
      {
        "sku_id": 220,
        "price": 12,
        "quantity": 12
      },
      {
        "sku_id": 221,
        "price": 15,
        "quantity": 5
      }
    ],
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": "7/5/2024",
    "active_sale_order": false
    
  },
  {
    "customer_id": 11909,
    "items": [
      {
        "sku_id": 222,
        "price": 20,
        "quantity": 3
      }
    ],
    "paid": true,
    "invoice_no": "Invoice - 1212122",
    "invoice_date": "8/5/2024",
    "active_sale_order": false
  }
];

function CompletedSaleTable() {
  

  
  // Filter data for the second table
  const paidData = data.filter(order => order.paid);

  return (
    <ChakraProvider theme={theme}>
        <NavBar/>
      <Box p={4} >
        
    
        <Box>
        <h1 style={{textAlign:"center" ,fontSize:"23px",marginTop:"10px"}}>Completed Sale Order</h1>
          <Table variant="simple" colorScheme="green" mt="30px">
            <Thead>
              <Tr>
                <Th>Customer ID</Th>
                <Th>SKU ID</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Paid</Th>
                <Th>Invoice No</Th>
                <Th>Invoice Date</Th>
                <Th>Active Sale Order</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {paidData.map((order, orderIndex) => (
                order.items.map((item, index) => (
                  <Tr key={`${order.customer_id}-${item.sku_id}`}>
                    {index === 0 && (
                      <Td rowSpan={order.items.length}>{order.customer_id}</Td>
                    )}
                    <Td>{item.sku_id}</Td>
                    <Td>{item.price}</Td>
                    <Td>{item.quantity}</Td>
                    {index === 0 && (
                      <>
                        <Td rowSpan={order.items.length}>{order.paid ? 'Yes' : 'No'}</Td>
                        <Td rowSpan={order.items.length}>{order.invoice_no}</Td>
                        <Td rowSpan={order.items.length}>{order.invoice_date}</Td>
                        <Td rowSpan={order.items.length}>{order.active_sale_order ? 'Yes' : 'No'}</Td>
                      </>
                    )}
                    <Td>
                      <Menu>
                        {/* <MenuButton as={IconButton} icon={<BiDotsVerticalRounded />} /> */}
                        <MenuList>
                          {/* <MenuItem onClick={() => handleEditClick(order)}>Edit</MenuItem> */}
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              ))}
            </Tbody>
          </Table>
        </Box>
        
      </Box>
    </ChakraProvider>
  );
}

export default CompletedSaleTable;
