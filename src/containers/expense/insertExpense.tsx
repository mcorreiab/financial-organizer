import { useRouter } from "next/router";
import InsertExpenseForm from "./components/insertExpenseForm";

const InsertExṕense: React.FC = () => {
  const router = useRouter();
  const onSubmit = (name: string, value: number) => {
    fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({ name, value }),
    });
  };

  const logoutAction = () => {
    fetch("/api/logout");
    router.replace("/signin");
  };

  return <InsertExpenseForm onSubmit={onSubmit} logoutAction={logoutAction} />;
};

export default InsertExṕense;
