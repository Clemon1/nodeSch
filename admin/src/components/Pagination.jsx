/* eslint-disable react/prop-types */
import { Button, HStack, Icon } from "@chakra-ui/react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  //   const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    paginate(pageNumber);
  };
  const isPreviousDisabled = currentPage === 1 || totalItems === 0;
  const isNextDisabled =
    currentPage === Math.ceil(totalItems / itemsPerPage) || totalItems === 0;

  return (
    <HStack spacing={2} mt={4} align='center' justify='center'>
      <Button
        isDisabled={isPreviousDisabled}
        rounded={16}
        onClick={() => handlePageChange(currentPage - 1)}>
        <Icon as={GrFormPrevious} fontSize={20} />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          rounded={16}
          bg={currentPage === number ? "nano.blue" : "gray"}
          color={"nano.light"}
          _hover={{}}
          onClick={() => handlePageChange(number)}>
          {number}
        </Button>
      ))}
      <Button
        isDisabled={isNextDisabled}
        rounded={16}
        onClick={() => handlePageChange(currentPage + 1)}>
        <Icon as={GrFormNext} fontSize={20} />
      </Button>
    </HStack>
  );
};

export default Pagination;
