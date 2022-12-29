import { Heading, VStack } from "@chakra-ui/react";

function ImportCSV() {
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
      </VStack>
   );
}

export default ImportCSV;
