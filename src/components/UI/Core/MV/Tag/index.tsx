import { Tag } from "antd";
const MVTags = ({ color, children, ...rest }:any) => {
  return (
    <Tag color={color} {...rest}>
      {children}
    </Tag>
  );
};

export default MVTags;
