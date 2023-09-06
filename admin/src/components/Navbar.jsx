import {
  Avatar,
  Button,
  Flex,
  HStack,
  Input,
  VStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Icon,
  FormControl,
} from "@chakra-ui/react";
import Notification from "./Notification";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import nanoProfile from "../assets/nanoProfile.png";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineLogout } from "react-icons/hi";

import { SlPeople } from "react-icons/sl";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiNotebook, GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logOut } from "../features/authSlice";
// import { useSearchUserQuery } from "../features/customerSlice";

const Navbar = () => {
  const user = useSelector(currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  let activeStyle = {
    width: "100%",
    color: "#00bac7",
    transition: " .8s ease-in-out all",
    borderRadius: "10px 28px",

    background: "rgba(0,186,199,.12)",
  };
  const navigate = useNavigate();
  const [userSearch, setUserSearch] = useState("");
  // const { data: searching } = useSearchUserQuery({ userSearch });
  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${userSearch}`);
  };
  const dispatch = useDispatch();
  const logginOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <HStack
      w={"full"}
      justifyContent={"space-evenly"}
      spacing={"18px"}
      alignItems={"center"}
      height={"12vh"}
      py={2}
      px={["15px", "45px", "40px", "70px", "80px"]}>
      <Flex w={"30%"} justifyContent={"flex-start"}>
        <>
          <Button
            display={["block", "block", "block", "block", "none"]}
            ref={btnRef}
            bg={"nano.blue"}
            _hover={{}}
            onClick={onOpen}>
            <Icon as={GiHamburgerMenu} color={"nano.light"} />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <VStack
                width={"100%"}
                spacing={10}
                transition={" .7s ease-in-out all"}
                height={"100%"}
                px={4}
                py={2}
                alignItems={"flex-start"}
                bg={"nano.blue"}>
                <Flex w={"full"} height={"70px"} alignItems={"center"}>
                  <Image src={nanoProfile} />
                  <DrawerCloseButton
                    bg={"nano.light"}
                    position={"relative"}
                    top={3}
                    right={8}
                  />
                </Flex>

                <Flex w={"full"} direction={"column"}>
                  <List
                    gap={"12px"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    color={"nano.light"}>
                    <NavLink
                      to='/home'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        paddingLeft={50}
                        fontSize={17}
                        py={"5px"}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={RxDashboard} />
                        Dashboard
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/customers'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={SlPeople} />
                        Customers
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/products'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={MdProductionQuantityLimits} />
                        Products
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/subscriptions'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={GiNotebook} />
                        Subscriptions
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/orders'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={GiNotebook} />
                        Orders
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/departments'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={BsPersonWorkspace} />
                        Departments
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/support'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={BiSupport} />
                        Support
                      </ListItem>
                    </NavLink>
                    <NavLink
                      to='/profile'
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }>
                      <ListItem
                        py={"5px"}
                        paddingLeft={50}
                        fontSize={17}
                        fontWeight={400}
                        display={"flex"}
                        alignItems={"center"}>
                        <ListIcon as={CgProfile} />
                        Profile
                      </ListItem>
                    </NavLink>
                  </List>
                  <Flex w='full' position={"relative"} top={"10px"}>
                    <Button
                      w={"full"}
                      rounded={12}
                      onClick={logginOut}
                      _hover={{
                        bg: "nano.light",
                        color: "nano.blue",
                      }}
                      bg={"rgba(0,186,199,.12)"}
                      color={"nano.light"}>
                      <Icon as={HiOutlineLogout} />
                      LogOut
                    </Button>
                  </Flex>
                </Flex>
              </VStack>
            </DrawerContent>
          </Drawer>
        </>
      </Flex>
      <Flex w={"60%"}>
        <form onSubmit={onSearch}>
          <FormControl width={["full", "full", "lg"]}>
            <Input
              width={"full"}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder='Search...'
              fontWeight={500}
              bg={"gray.300"}
            />
          </FormControl>
        </form>
      </Flex>

      <Flex w={"40%"} gap={4} alignItems={"center"} justifyContent={"flex-end"}>
        <Notification />
        <NavLink to={"/profile"}>
          <Avatar
            size={"sm"}
            name={user.fullname}
            src='https://bit.ly/broken-link'
          />
        </NavLink>
      </Flex>
    </HStack>
  );
};

export default Navbar;
