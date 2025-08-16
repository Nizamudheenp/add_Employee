import React from "react";
import MainLayout from "./components/layout/MainLayout";
import AddEmployee from "./views/AddEmployee";

const App: React.FC = () => {
  return (
    <MainLayout>
      <AddEmployee />
    </MainLayout>
  );
};

export default App;
