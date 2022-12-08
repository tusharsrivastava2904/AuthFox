import React from 'react'
import {Box, Container, Tab, Tabs, TabPanel, TabPanels ,TabList, Text} from "@chakra-ui/react"
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        opacity="75%"
        w="100%"
        m="14px 0 15px 0"
        borderRadius="4px"
        borderWidth="1px"
      >
        <Text
          fontSize={"2xl"}
          fontFamily="zen dots"
          color={"black"}
          align="center"
        >
          AuthFox
        </Text>
      </Box>

      <Box
        bg={"white"}
        opacity="75%"
        w="100%"
        borderRadius="4px"
        borderWidth="1px"
        marginBottom="5%"
        p={4}
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="purple" opacity={"1"}>
          <TabList mb="1em">
            <Tab width="50%">Log-In</Tab>
            <Tab width="50%">Sign-Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home