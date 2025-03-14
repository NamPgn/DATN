import { ReactNode } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  @import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
`;

const TailwindComponent = ({ children, ...rest }: { children: ReactNode }) => {
  return <StyledDiv {...rest}>{children}</StyledDiv>;
};

export default TailwindComponent;
