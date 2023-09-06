import {
  Box,
  Card,
  Flex,
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { BsPeopleFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";
import { BsPersonCheckFill } from "react-icons/bs";
import Barchart from "../components/Barchart";
import Piechart from "../components/PieChart";
import { useGetProductQuery } from "../features/productSlice";

import { useGetAllUserQuery } from "../features/customerSlice";

import { useGetOrdersQuery } from "../features/orderSlice";
import {
  useGetAllSubscriptionQuery,
  useGetNoOfUserSubsQuery,
} from "../features/subscriptionSlice";

const Dashboard = () => {
  const { data: product } = useGetProductQuery();
  const { data: sub } = useGetAllSubscriptionQuery();
  const { data: subNumber } = useGetNoOfUserSubsQuery();
  const label = product && product.map((p) => p.name);
  const power = product && product.map((p) => p.specification.powerConsumption);

  const donutLabel =
    subNumber && subNumber.productSubscribers.map((subNo) => subNo.productName);
  const donutNoOfUser =
    subNumber &&
    subNumber.productSubscribers.map((subNo) => subNo.subscriberCount);

  const { data: customer } = useGetAllUserQuery("user");
  const { data: allOrders } = useGetOrdersQuery();

  const starts = [
    {
      title: "Total Customers",
      Total: customer && customer.allUser.length,
      backgroundColor: "#00c6bd5e",
      iconColor: "#073b4c",
      icon: BsPeopleFill,
    },
    {
      title: "Total Products",
      Total: product && product.length,
      backgroundColor: "#3f91f95e",
      iconColor: "#004499",
      icon: HiShoppingCart,
    },
    {
      title: "Total Orders",
      Total: allOrders && allOrders.length,
      backgroundColor: "#f9f871a6",
      iconColor: "#8f4304",
      icon: GiNotebook,
    },
    {
      title: "Active Subcriptions",
      Total: sub && sub.length,
      backgroundColor: "#83ffa2d9",
      iconColor: "#006239",
      icon: BsPersonCheckFill,
    },
  ];

  return (
    <Flex
      width={"100%"}
      height={[
        "fit-content",
        "fit-content",
        "fit-content",
        "fit-content",
        "100vh",
      ]}>
      <Sidebar />
      <Box width={"full"} height={"100%"} bg={"nano.light"}>
        <Navbar />
        <Flex
          width={"full"}
          flexWrap={"wrap"}
          gap={3}
          px={[3, 6, 10, 20, 10]}
          py={4}
          height={[
            "fit-content",
            "fit-content",
            "fit-content",
            "fit-content",
            "20vh",
          ]}>
          {starts.map((starts, i) => (
            <Card
              key={i}
              width={["48%", "48%", "49%", "30", "24%"]}
              bg={"nano.lighter"}
              transition='transform 0.2s'
              _hover={{ transform: "scale(1.05)" }}
              height={"fit-content"}
              padding={2}
              rounded={12}>
              <Flex
                w={"full"}
                alignItems={"center"}
                direction={[
                  "column-reverse",
                  "column-reverse",
                  "row",
                  "row",
                  "row",
                ]}>
                <Stat>
                  <StatLabel>{starts.title}</StatLabel>
                  <StatNumber>{starts.Total}</StatNumber>
                  <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                </Stat>

                <Flex
                  width={["26%", "22%", "10%", "12%", "26%"]}
                  height={["5vh", "8vh", "8vh", "10vh", "10vh"]}
                  justifyContent={"center"}
                  alignItems={"center"}
                  rounded={"full"}
                  bg={starts.backgroundColor}>
                  <Icon
                    as={starts.icon}
                    fontSize={22}
                    color={starts.iconColor}
                  />
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>

        <Flex
          direction={["column", "column", "row", "row", "row"]}
          w={"full"}
          height={["fit-content", "fit-content", "64vh", "64vh", "64vh"]}
          gap={3}
          px={[3, 6, 10, 20, 10]}
          py={4}>
          <Card
            w={"full"}
            bg={"nano.white"}
            height={["55vh", "50vh", "100%", "100%", "100%"]}
            transition='transform 0.2s'
            _hover={{ transform: "scale(1.01)" }}
            padding={2}
            rounded={12}>
            <Flex w={"full"} height={"100%"} alignItems={"center"}>
              <Barchart labels={label} power={power} />
            </Flex>
          </Card>
          <Card
            w={"full"}
            bg={"nano.white"}
            padding={2}
            transition='transform 0.2s'
            _hover={{ transform: "scale(1.01)" }}
            height={["55vh", "50vh", "100%", "100%", "100%"]}
            rounded={12}>
            <Flex w={"full"} height={"100%"} justifyContent={"center"}>
              <Piechart label={donutLabel} dataBody={donutNoOfUser} />
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
