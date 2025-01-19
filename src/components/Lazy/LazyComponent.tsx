import { ReactNode, Suspense } from "react";

const LazyComponent = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={"Loading"}>{children}</Suspense>
);

export default LazyComponent;
