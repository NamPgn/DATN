import { Button } from "antd";
import { memo } from "react";
export const MyButton = memo(({ children, ...rest }: any) => {
  return <Button {...rest}>{children}</Button>;
});
