import { Table, Tbody, TableContainer } from '@chakra-ui/react';

import TableRow from './TableRow';

const NotificationTable = ({ notification }) => {
  // console.log('this is notification table', notification);
  const newData = notification.slice(15, 30);
  // console.log('new data', newData);

  let content;
  content = (
    <TableContainer w={'100%'}>
      <Table>
        <Tbody>
          {typeof notification === 'object' &&
            notification.map((not) => <TableRow data={not} key={not._id} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return content;
};

export default NotificationTable;
