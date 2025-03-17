import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo } from "react";
import { Link } from "react-router-dom";
export const MyButton = memo(({ children, ...rest }: any) => {
  return <Button {...rest}>{children}</Button>;
});

export const ButtonAdd = memo(({ children, path, ...rest }: any) => {
  return (
    <Link to={path}>
      <MyButton
        color="default"
        className="mb-3"
        variant="dashed"
        icon={<PlusOutlined />}
      >
        Thêm
      </MyButton>
    </Link>
  );
});
