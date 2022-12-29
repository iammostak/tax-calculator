import {
   Button,
   Heading,
   HStack,
   Input,
   Text,
   useToast,
   VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const tax_rates = { 0: 5, 1: 8, 2: 12 };

const addTaxes = (data) => {
   data = data.map((item, index) => {
      item = item.split(",");

      if (index === 0) {
         item.push("tax");
         item = item.join(",");
         return item;
      } else {
         let amount = +item[1],
            item_type = +item[2];
         let tax_amount = amount * (tax_rates[item_type] / 100);

         if (item_type > 2) {
            item.push("NA");
            item = item.join(",");
            return item;
         } else {
            item.push(tax_amount.toFixed(2));
            item = item.join(",");
            return item;
         }
      }
   });

   data = data.join("\r\n");

   const blob = new Blob([data], { type: "text/csv" });
   const file = new File([blob], "result.csv", { type: "text/csv" });

   return file;
};

function ImportCSV() {
   const [inputFile, setInputFile] = useState({});
   const toast = useToast();
   const [url, setUrl] = useState("");

   const handleFile = () => {
      if (!inputFile.name) {
         toast({
            title: "Please select a invoice.csv file",
            status: "warning",
            position: "top",
            duration: 3000,
            isClosable: true,
         });
         return;
      }
      const reader = new FileReader();

      reader.onload = async (event) => {
         let file = addTaxes(event.target.result.split("\r\n"));

         setUrl(URL.createObjectURL(file));
         toast({
            title: "file uploaded successfully",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
         });
      };

      reader.readAsText(inputFile);
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
            import invoice.csv
         </Heading>
         <Text
            fontFamily={"Helvetica"}
            letterSpacing={0.5}
            align={"center"}
            w={700}
            pb={4}
            color={"blackAlpha.700"}
         >
            Upload a .csv file, File should have s.no, amount, item_type in it
            to get the texes.
            <br /> Also you will be getting the taxes of those amounts which
            have item_type as 0, 1 or 2 other than that taxes will be "NA"
         </Text>
         <HStack>
            <Input
               py={1}
               type="file"
               accept=".csv"
               border={"2px solid"}
               borderColor={"blue.500"}
               onChange={(event) => setInputFile(event.target.files[0])}
            />
            <Button px={7} colorScheme={"blue"} onClick={handleFile}>
               Upload
            </Button>
         </HStack>
         <Button
            w={447}
            disabled={!url}
            as={"a"}
            href={url}
            colorScheme={"green"}
            download="result"
         >
            Download
         </Button>
      </VStack>
   );
}

export default ImportCSV;
