import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <h1>Using Dashboard Layout</h1>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
