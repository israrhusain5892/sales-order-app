// src/ProductForm.jsx
import React from 'react';
import { useForm,useFieldArray, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useToast,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import productList from 'src/components/productList';
import { productList } from './productList';
import { useEffect ,useState} from 'react';

   
 
export const submitForm = async (formData) => {
  // Here you would handle your form submission to your API
   localStorage.setItem("getData",JSON.stringify(formData));
  console.log('Form Data:', formData);
   return formData;
};








const ProductForm = () => {
    
 
    const [formData1, setFormData] = useState([]);
     
      
    const { control, handleSubmit, formState: { errors }, register ,setValue} = useForm();
  
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (selectedOptions) => {
    const selectedProductIds = selectedOptions ? selectedOptions.map(option => option.id) : [];
    setSelectedProducts(selectedProductIds);
    if(selectedProductIds){
        setValue('cutomerId',"1102");
        setValue('paid',false);
    }
  };
     
      const filteredSkus = productList.filter(item => selectedProducts.includes(item.id));
      
     

  const productOptions = productList.map(product => ({id: product.id, label: product.name, value: product.id }));
  
 

  
        

   const toast = useToast();
  const mutation = useMutation({
    mutationFn:submitForm, 
    onSuccess: (data) => {
      toast({
        title: "Form submission successful.",
        description: "The form was submitted successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Form submission failed.",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  
  const onSubmit = (data) => {
    mutation.mutate(data);
      const dataTo= {
        ...data,
           'customerId':data.customerId,
           'paid':data.paid
       }
     
    //  console.log(dataTo);
  };

  
 

 

  return (
 
      
        <form onSubmit={handleSubmit(onSubmit)} style={{width:"800px"}} >
          <Stack spacing={4} >
            
            
            <FormControl id="products" isInvalid={errors.products}>
              <FormLabel>All Products <span style={{color:"red"}}>*</span></FormLabel>
              
              <Controller
                name="products"
                control={control}
                // rules={{ required: 'Please select at least one product' }}
                render={({ field }) => (
                  <Select
                    // value={value}
                    onChange={handleProductSelection}
                    
                    isMulti
                    // options={products?.map(product => ({ value: product.id, label: product.name, })) || []}
                    options={productOptions}
                    // {...field}
                    
                  />
                )}
              />
              
              {errors.products && (
                <Text color="red.500" fontSize="sm">
                  {errors.products.message}
                </Text>
              )}
            </FormControl>
            {/* start here sku */}
          
            {filteredSkus.map((product, productIndex) => (
              product.sku.map((sku, skuIndex) => (
                <Box key={`${product.id}-${sku.id}`} border="1px solid #ddd" p="15px" boxShadow="0px 0px 4px #ccc" borderRadius="5px">
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="500">{skuIndex + 1}. SKU{sku.id} ({sku.amount}{sku.unit})</Text>
                    <Text fontSize="sm" borderRadius="5px" width="70px" textAlign="center" background="#eee" fontWeight="500">Rate: ₹ {sku.selling_price}</Text>
                  </HStack>
                  <Box my="4" height="1px" background="#ddd" />
    
                  <HStack spacing="10px" mt="30px" pb="10px" >
                    <FormControl id={`selling_price-${productIndex}-${skuIndex}`} isInvalid={errors.selling_price}>
                      <FormLabel fontSize="sm">Selling Rate</FormLabel>
                      <Input placeholder="Enter selling Rate" {...register(`products.${productIndex}.sku.${skuIndex}.selling_price`)} />
                      {errors.selling_price && (
                        <Text color="red.500" fontSize="sm">
                          {errors.selling_price.message}
                        </Text>
                      )}
                    </FormControl>
    
                    <FormControl id={`quantity-${productIndex}-${skuIndex}`} mt="15px" isInvalid={errors.quantity}>
                      <FormLabel fontSize="sm">Total items</FormLabel>
                      <Controller
                        control={control}
                        name={`products.${productIndex}.sku.${skuIndex}.quantity`}
                        render={({ field }) => <Input {...field} placeholder="Enter quantity" />}
                      />
                      {errors.quantity && (
                        <Text color="red.500" fontSize="sm">
                          {errors.quantity.message}
                        </Text>
                      )}
                      <Text fontSize="sm" p="0"  ml={["10px", "20px", "30px", "220px"]} width="140px" borderRadius="6px" textAlign="center"  fontWeight="500" background="#d6f6b2">
                        {sku.quantity_in_inventory} Item(s) Remaining
                      </Text>
                    </FormControl>
                  </HStack>
                </Box>
              ))
            ))}
          
            
            <FormControl    id="invoiceDate" isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date<span style={{color:"red"}}>*</span></FormLabel>
              <Controller
                
                name="invoice_date"
                control={control}
                
                   
                rules={{ required: 'Invoice date is required' }}
                render={({ field }) => (
                  <div style={{
                     border:'1px solid #ccc',
                     width:'184px',
                     borderRadius:'4px'
                  }}>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText='Select a date'
                  />
                  </div>
                )}
                
              />
              {errors.invoice_date && (
                <Text color="red.500" fontSize="sm">
                  {errors.invoice_date.message}
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
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
  );
};

export default ProductForm;
