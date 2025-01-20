import { Avatar } from "antd";
import { memo } from "react";
export const MVAvatar = memo(({ title, src, size, ...rest }: any) => {
  return (
    <div title={title} style={{ cursor: "pointer" }}>
      <Avatar  size={size} color="default" src={src} {...rest} />
    </div>
  );
});

