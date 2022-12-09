import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

const Signup = () => {

    const [show, setShow] = useState(false);
    const [showCP, setShowCP] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    
    const toast = useToast();
    const handleClick = () => setShow(!show);
    const handleClickConfirmPassword = () => setShowCP(!showCP);

    const postDetails = (pics) => {
      setLoading(true);
      if(pics===undefined) {
        toast({
          title: "Please select an Image",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      if (pics.type==="image/jpeg" || pics.type==="image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "authfox");
        data.append("cloud_name", "dvslhds5w");
        fetch("https://api.cloudinary.com/v1_1/dvslhds5w/image/upload", {
          method: "post",
          body: data,
        }).then((res) => res.json())
          .then((data) => {
           setPic(data.url.toString());
           console.log(data.url.toString());
           setLoading(false);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        });
      } else {
        toast({
          title: "Please select an Image",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
    };
    const submitHandler = async () => {
      setLoading(true);
      if(!name || !email || !password || !confirmPassword){
        toast({
          title: "Please fill all the fields!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      } if (password!==confirmPassword){
        toast({
          title: "Passwords do not match!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          }
        };
        const {data} = await axios.post("api/user", {name, email, password, pic}, config);
        toast({
          title: "Signed-Up Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push('/chats')
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      }

    };


  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          placeholder="Enter Your E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Confirm Password"
            type={showCP ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickConfirmPassword}>
              {showCP ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="purple"
        width="100%"
        color="white"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign-Up
      </Button>
    </VStack>
  );
}

export default Signup