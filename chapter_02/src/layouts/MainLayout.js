import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <h1>Using Main Layout</h1>
      <Outlet />
    </>
  );
};

export default MainLayout;
