import Title from "antd/es/typography/Title";
import { memo } from "react";

const MVTitle = memo(({ level, children, ...rest }: any) => {
  return (
    <Title level={level} {...rest}>
      {children}
    </Title>
  );
});

export default MVTitle;
