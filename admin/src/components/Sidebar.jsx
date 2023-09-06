import {
  Flex,
  VStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Button,
  Icon,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import nanoProfile from "../assets/nanoProfile.png";
import { RxDashboard } from "react-icons/rx";
import { SlPeople } from "react-icons/sl";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiNotebook } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
const Sidebar = () => {
  let activeStyle = {
    width: "100%",
    color: "#00bac7",
    borderRadius: "10px 28px",
    transition: " 0.8s ease-in-out all ",
    background: "rgba(0,186,199,.12)",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logginOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <VStack
      width={"250px"}
      // spacing={10}
      display={["none", "none", "none", "none", "block"]}
      // transition={" .7s ease-in-out all"}
      // height={"100%"}
      // px={4}
      // py={2}
      // alignItems={"flex-start"}
      bg={"nano.blue"}>
      <VStack
        width={"211px"}
        spacing={10}
        left={0}
        position={"fixed"}
        display={["none", "none", "none", "none", "block"]}
        transition={" .7s ease-in-out all"}
        height={"100%"}
        px={4}
        py={2}
        alignItems={"flex-start"}
        bg={"nano.blue"}>
        <Flex w={"full"} height={"50px"} alignItems={"center"}>
          <Link to={"/home"}>
            <Image src={nanoProfile} />
          </Link>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
              style={({ isActive }) => (isActive ? activeStyle : undefined)}>
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
          <Flex w='full' position={"relative"} top={"85px"}>
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
    </VStack>
  );
};

export default Sidebar;
