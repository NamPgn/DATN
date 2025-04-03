import { memo } from "react";
import { Menu } from "antd";
import { Link, NavLink } from "react-router-dom";
const MVMenuItem = memo(({ data, icons, id, background, ...rest }: any) => {
  return (
    <Menu
      className="h-full"
      style={{
        background: background,
      }}
    >
      {data &&
        data.map((item:any, index:any) => (
          <Menu.Item
            {...rest}
            icon={item.icon ? item.icon : icons[index]}
            key={index}
          >
            {id == true ? (
              <NavLink
                to={
                  item.path == "/" ? item.path : item.path + "/" + `${item._id}`
                }
                key={index}
              >
                {item.name}
              </NavLink>
            ) : (
              <Link to={item.path}>{item.name}</Link>
            )}
          </Menu.Item>
        ))}
    </Menu>
  );
});

export default MVMenuItem;
