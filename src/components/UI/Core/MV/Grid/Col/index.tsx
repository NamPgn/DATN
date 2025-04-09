import { Col } from "antd";
const MVCol = ({ children, ...rest }:any) => {
  return <Col {...rest}>{children}</Col>;
};

export default MVCol;
