import { Outlet } from "react-router-dom";
const LayoutAuth = () => {
  return (
    <>
      <div style={{ zIndex: "-1" }}>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutAuth;
