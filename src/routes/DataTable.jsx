import {
   Button,
   Heading,
   HStack,
   Table,
   Tbody,
   Td,
   Th,
   Thead,
   Tooltip,
   Tr,
   useToast,
   VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { invoices } from "../db.json";

function DataTable() {
   const [tax, setTax] = useState(0);
   const toast = useToast();

   const handleCalculateTax = (amount, item_type) => {
      let tax_rate;

      if (item_type === 0) tax_rate = 5 / 100;
      else if (item_type === 1) tax_rate = 8 / 100;
      else tax_rate = 12 / 100;

      setTax(amount * tax_rate);
      toast({
         title: "Tax Calculated Successfully",
         status: "success",
         position: "top",
         duration: 3000,
         isClosable: true,
      });
   };

   return (
      <VStack my={7} justify={"stretch"} spacing={5}>
         <Heading
            mb={3}
            pb={4}
            align={"center"}
            color={"blue.500"}
            fontFamily={"Helvetica"}
            fontWeight={800}
            letterSpacing={0.5}
            borderBottom={"1px solid"}
            borderColor={"blackAlpha.100"}
         >
            data table
         </Heading>
         <Table
            size={"lg"}
            border={"1px solid"}
            borderColor={"blue.100"}
            variant={"striped"}
            colorScheme={"blue"}
         >
            <Thead bg={"blue.500"}>
               <Tr>
                  <Th
                     w={210}
                     fontSize={"md"}
                     textAlign={"center"}
                     textTransform={"capitalize"}
                     color={"white"}
                  >
                     Serial No.
                  </Th>
                  <Th
                     w={210}
                     fontSize={"md"}
                     textAlign={"center"}
                     textTransform={"capitalize"}
                     color={"white"}
                  >
                     Amount
                  </Th>
                  <Th
                     w={210}
                     fontSize={"md"}
                     textAlign={"center"}
                     textTransform={"capitalize"}
                     color={"white"}
                  >
                     Item Type
                  </Th>
                  <Th
                     w={210}
                     fontSize={"md"}
                     textAlign={"center"}
                     textTransform={"capitalize"}
                     color={"white"}
                  >
                     Calculate Tax
                  </Th>
               </Tr>
            </Thead>
            <Tbody>
               {invoices.map((item) => (
                  <Tr key={item.sno}>
                     <Td textAlign={"center"} fontWeight={500}>
                        {item.sno}
                     </Td>
                     <Td textAlign={"center"} fontWeight={500}>
                        {item.amount}
                     </Td>
                     <Td textAlign={"center"} fontWeight={500}>
                        {item.item_type}
                     </Td>
                     <Td textAlign={"center"}>
                        {item.item_type > 2 ? (
                           <Tooltip
                              w={40}
                              textAlign={"center"}
                              hasArrow
                              placement={"right"}
                              label={
                                 "calculation not allowed for item type greater than 2"
                              }
                           >
                              <Button
                                 px={7}
                                 colorScheme={"blue"}
                                 borderRadius={"3xl"}
                                 disabled={true}
                              >
                                 Calculate
                              </Button>
                           </Tooltip>
                        ) : (
                           <Button
                              px={7}
                              colorScheme={"blue"}
                              borderRadius={"3xl"}
                              onClick={() =>
                                 handleCalculateTax(item.amount, item.item_type)
                              }
                           >
                              Calculate
                           </Button>
                        )}
                     </Td>
                  </Tr>
               ))}
            </Tbody>
         </Table>
         <HStack py={7}>
            <Heading
               size={"lg"}
               align={"center"}
               color={"blue.500"}
               fontFamily={"Helvetica"}
               fontWeight={800}
               letterSpacing={0.5}
            >
               Calculated Tax Value :
            </Heading>
            <Heading
               size={"lg"}
               align={"center"}
               color={"blackAlpha.700"}
               fontFamily={"Helvetica"}
               fontWeight={800}
               letterSpacing={0.5}
            >
               {tax || "0.00"}
            </Heading>
         </HStack>
      </VStack>
   );
}

export default DataTable;
