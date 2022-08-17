import React from "react";
import Header from "./Header/Header";
import DropDown from "./DropDown/DropDown";
import Table from "./Table/Table";
import Sidebar from "../Components/Sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div>
      <Sidebar login={true}>
      <hr className="horizontalLine" />
      <Header />
      <DropDown />
      <Table />
      </Sidebar>
    </div>
  );
};

export default Dashboard;
