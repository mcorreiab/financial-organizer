import { useRouter } from "next/router";
import ListExpenses from "./components/listExpenses";

type Props = {
  expenses: Expense[];
};

export type Expense = {
  id: string;
  name: string;
  value: number;
};

const List = ({ expenses }: Props) => {
  const router = useRouter();

  const onNewExpense = () => {
    router.push("/newExpense");
  };

  return <ListExpenses expenses={expenses} onNewExpense={onNewExpense} />;
};

export default List;
