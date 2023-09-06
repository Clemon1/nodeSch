import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  MdAdminPanelSettings,
  MdDriveFileRenameOutline,
  MdEmail,
} from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useGetUserQuery } from "../features/registerSlice";

const Profile = () => {
  const { data } = useGetUserQuery();
  console.log(data);

  return (
    <Flex width='100%' height='100vh'>
      <Sidebar />
      <Box width='full' height='100%' bg='gray.100'>
        <Navbar />
        <Flex
          w='full'
          px={[4, 4, 4, 4, 4]}
          justifyContent='center'
          align='center'
          height='80vh'>
          <Box
            w='full'
            maxWidth={["full", "full", "60%", "60%", "40%"]}
            p={6}
            rounded={12}
            bg='white'>
            <Card border={"none"} boxShadow={"none"}>
              <Flex justify='center'>
                <Avatar size='2xl' name={data && data.fullname} />
              </Flex>
              <Flex direction='column' mt={8}>
                <List spacing={4}>
                  <ListItem display='flex' alignItems='center'>
                    <MdDriveFileRenameOutline color='green' size={24} />
                    <Box ml={2}>{data && data.fullname}</Box>
                  </ListItem>
                  <ListItem display='flex' alignItems='center'>
                    <MdEmail color='green' size={24} />
                    <Box ml={2}>{data && data.email}</Box>
                  </ListItem>
                  <ListItem display='flex' alignItems='center'>
                    <MdAdminPanelSettings color='green' size={24} />
                    <Box ml={2}>
                      <Badge fontSize='md' rounded='md' colorScheme='messenger'>
                        {data && data.role}
                      </Badge>
                    </Box>
                  </ListItem>
                  <ListItem display='flex' alignItems='center'>
                    <BsFillCalendarDateFill color='green' size={24} />
                    <Box ml={2}>17/05/2023</Box>
                  </ListItem>
                </List>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
