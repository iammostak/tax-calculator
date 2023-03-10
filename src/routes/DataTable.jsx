import {
   Button,
   Heading,
   HStack,
   Table,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tooltip,
   Tr,
   useToast,
   VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ContentTitle from "../components/ContentTitle";
import { invoices } from "../db.json";

const tableHeaders = ["Serial No.", "Amount", "Item Type", "Calculate Tax"];

function DataTable() {
   const [tax, setTax] = useState(0);
   const [taxRate, setTaxRate] = useState("0%");
   const toast = useToast();

   const handleCalculateTax = (amount, item_type) => {
      let tax_rate;

      if (item_type === 0) {
         tax_rate = 5 / 100;
         setTaxRate("5%");
      } else if (item_type === 1) {
         tax_rate = 8 / 100;
         setTaxRate("8%");
      } else {
         tax_rate = 12 / 100;
         setTaxRate("12%");
      }

      setTax(amount * tax_rate);
      toast({
         title: "Tax Calculated Successfully",
         status: "success",
         position: "top",
         duration: 3000,
         isClosable: true,
      });
      window.scrollBy(0, window.innerHeight);
   };

   return (
      <VStack data-testid="data-table" my={7} justify={"stretch"} spacing={5}>
         <ContentTitle>data table</ContentTitle>
         <Table
            size={"lg"}
            border={"1px solid"}
            borderColor={"blue.100"}
            variant={"striped"}
            colorScheme={"blue"}
            data-testid="table"
         >
            <Thead bg={"blue.500"}>
               <Tr>
                  {tableHeaders.map((item, index) => (
                     <Th
                        data-testid="table-header"
                        key={index + 1}
                        w={210}
                        fontSize={"md"}
                        textAlign={"center"}
                        textTransform={"capitalize"}
                        color={"white"}
                     >
                        {item}
                     </Th>
                  ))}
               </Tr>
            </Thead>
            <Tbody>
               {invoices.map((item) => (
                  <Tr data-testid="table-row" key={item.sno}>
                     <Td textAlign={"center"} fontWeight={500}>
                        {item.sno}
                     </Td>
                     <Td textAlign={"center"} fontWeight={500}>
                        ???{item.amount}
                     </Td>
                     <Td textAlign={"center"} fontWeight={500}>
                        {item.item_type}
                     </Td>
                     <Td textAlign={"center"}>
                        {item.item_type > 2 ? (
                           <Tooltip
                              w={44}
                              textAlign={"center"}
                              hasArrow
                              placement={"right"}
                              label={
                                 "for tax-calculation item type should be 0, 1 or 2"
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
                              data-testid="tax-cal-btn"
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
         <HStack py={7} align="flex-end">
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
               data-testid="tax-value"
               size={"lg"}
               align={"center"}
               color={"blackAlpha.700"}
               fontFamily={"Helvetica"}
               fontWeight={800}
               letterSpacing={0.5}
            >
               ???{tax.toFixed(2) || "0.00"}
            </Heading>
            <Text
               data-testid="tax-rate"
               color={"green.500"}
               fontFamily={"Helvetica"}
               fontWeight={600}
               letterSpacing={0.5}
            >
               (Tax Rate : {taxRate})
            </Text>
         </HStack>
      </VStack>
   );
}

export default DataTable;
