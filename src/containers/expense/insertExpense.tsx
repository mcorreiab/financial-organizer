import InsertExpenseForm from "./components/insertExpenseForm";

const InsertExṕense: React.FC = () => {
  const onSubmit = (name: string, value: number) => {
    fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({ name, value }),
    });
  };

  return <InsertExpenseForm onSubmit={onSubmit} />;
};

export default InsertExṕense;
