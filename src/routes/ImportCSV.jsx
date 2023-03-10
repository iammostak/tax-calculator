import { AttachmentIcon, DownloadIcon } from "@chakra-ui/icons";
import {
   Button,
   FormControl,
   FormLabel,
   Heading,
   HStack,
   Input,
   Text,
   useToast,
   VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ContentTitle from "../components/ContentTitle";

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
   const [state, setState] = useState(false);
   const [calBtn, setCalBtn] = useState(false);
   const [uploadedFile, setUploadedFile] = useState([]);

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
         setUploadedFile(event.target.result.split("\r\n"));

         toast({
            title: "file uploaded successfully",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
         });
         setCalBtn(true);
      };

      reader.readAsText(inputFile);
   };

   const handleCalculate = () => {
      let file = addTaxes(uploadedFile);

      setUrl(URL.createObjectURL(file));
      toast({
         title: "tax calculated successfully",
         status: "success",
         position: "top",
         duration: 3000,
         isClosable: true,
      });
      setState(true);
      setCalBtn(false);
      setInputFile({});
   };

   return (
      <VStack data-testid="upload-csv" my={7} justify={"stretch"} spacing={5}>
         {!state && (
            <>
               <ContentTitle>import invoice.csv</ContentTitle>
               <Text
                  pb={4}
                  w={700}
                  fontWeight={500}
                  align={"center"}
                  letterSpacing={0.2}
                  color={"blackAlpha.700"}
               >
                  Upload a .csv file, File should have s.no, amount, and
                  item_type in it to get the taxes.
                  <br />
                  Also, you will be getting the taxes of those amounts which
                  have item_type as 0, 1, or 2 other than that taxes will be
                  "NA"
               </Text>
               <FormControl
                  w={"xs"}
                  p={4}
                  borderRadius={"md"}
                  boxShadow={"md"}
                  border={"1px solid"}
                  borderColor={"blackAlpha.50"}
                  isRequired
               >
                  <FormLabel>File</FormLabel>
                  <Input
                     data-testid="input-file"
                     py={1}
                     mb={2}
                     type="file"
                     accept=".csv"
                     border={"2px solid"}
                     disabled={calBtn}
                     borderColor={!calBtn ? "blue.500" : "green.500"}
                     onChange={(event) => setInputFile(event.target.files[0])}
                  />
                  {!calBtn ? (
                     <Button
                        data-testid="upload-btn"
                        w={"full"}
                        px={7}
                        colorScheme={"blue"}
                        onClick={handleFile}
                     >
                        Upload File
                     </Button>
                  ) : (
                     <>
                        <Button
                           data-testid="calculate-btn"
                           w={"full"}
                           px={7}
                           mb={2}
                           colorScheme={"green"}
                           onClick={handleCalculate}
                        >
                           Calculate Tax
                        </Button>
                        <Button
                           w={"full"}
                           onClick={() => setCalBtn(false)}
                           colorScheme={"blue"}
                           leftIcon={<AttachmentIcon />}
                        >
                           Upload Another File
                        </Button>
                     </>
                  )}
               </FormControl>
            </>
         )}
         {state && (
            <>
               <ContentTitle>tax-calculated</ContentTitle>
               <VStack
                  data-testid="download-form"
                  p={4}
                  w={"xs"}
                  align={"stretch"}
                  borderRadius={"md"}
                  boxShadow={"md"}
                  border={"1px solid"}
                  borderColor={"blackAlpha.100"}
               >
                  <Text
                     pb={2}
                     fontWeight={500}
                     lineHeight={1.4}
                     letterSpacing={0.1}
                     color={"blackAlpha.700"}
                     align={"left"}
                  >
                     Tax has been calculated.
                     <br />
                     Download or upload an another file.
                  </Text>
                  <Button
                     w={"full"}
                     as={"a"}
                     href={url}
                     colorScheme={"green"}
                     download="result"
                     leftIcon={<DownloadIcon />}
                  >
                     Download
                  </Button>
                  <Button
                     w={"full"}
                     onClick={() => setState(false)}
                     colorScheme={"blue"}
                     leftIcon={<AttachmentIcon />}
                  >
                     Upload Another File
                  </Button>
               </VStack>
            </>
         )}
      </VStack>
   );
}

export default ImportCSV;
