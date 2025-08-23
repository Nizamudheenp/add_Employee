import React from "react";
import MainLayout from "./components/layout/MainLayout";
// import AddEmployee from "./views/AddEmployee";
import EmployeeDashboard from "./views/EmployeeDashboard";

const App: React.FC = () => {
  return (
    <MainLayout>
      {/* <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 p-4">
        <div className="2xl:sticky 2xl:top-0 self-start">
          <AddEmployee />
        </div> */}
        <div>
          <EmployeeDashboard employeeId="EMP001" />
        </div>
      {/* </div> */}
    </MainLayout>
  );
};

export default App;
