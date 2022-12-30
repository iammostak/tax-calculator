import { AttachmentIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Navbar() {
   return (
      <Flex
         py={4}
         px={10}
         w={"full"}
         bg={"white"}
         boxShadow={"md"}
         align={"center"}
         justify={"space-between"}
         pos={"sticky"}
         top={0}
         zIndex={24}
      >
         <Heading
            color={"blue.500"}
            fontFamily={"Helvetica"}
            fontWeight={800}
            letterSpacing={0.5}
            as={NavLink}
            to="/"
         >
            tax-calculator
         </Heading>
         <HStack spacing={4}>
            <Button as={NavLink} to="/" px={7} borderRadius={"3xl"}>
               data table
            </Button>
            <Button
               as={NavLink}
               to="/uploadcsv"
               px={7}
               colorScheme={"blue"}
               borderRadius={"3xl"}
               leftIcon={<AttachmentIcon />}
            >
               upload csv
            </Button>
         </HStack>
      </Flex>
   );
}

export default Navbar;
