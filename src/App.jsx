import { Container } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
   return (
      <Container
         m={0}
         p={0}
         minH={"100vh"}
         maxW={"container"}
         bg={"whitesmoke"}
         centerContent
      >
         <Navbar />
         <AllRoutes />
      </Container>
   );
}

export default App;
