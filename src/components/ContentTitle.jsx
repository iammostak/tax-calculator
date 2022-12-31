import { Heading } from "@chakra-ui/react";

function ContentTitle({ children }) {
   return (
      <Heading
         data-testid="title"
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
         {children}
      </Heading>
   );
}

export default ContentTitle;
