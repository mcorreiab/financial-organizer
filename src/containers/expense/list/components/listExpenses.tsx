import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Expense } from "../list";

type Props = {
  expenses: Expense[];
  onNewExpense: () => void;
};

const ListExpenses = ({ expenses, onNewExpense }: Props) => {
  return (
    <main>
      <Flex mb={7} justifyContent="space-between" alignItems="center">
        <Heading
          as="h1"
          flexGrow="1"
          textAlign="center"
          size={{ base: "sm", md: "xl" }}
        >
          List of expenses
        </Heading>
        <Button
          colorScheme="green"
          size={{ base: "xs", md: "md" }}
          onClick={onNewExpense}
        >
          Create a new expense
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="green">
          <TableCaption>List of expenses</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.name}>
                <Td>{expense.name}</Td>
                <Td>{expense.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default ListExpenses;
