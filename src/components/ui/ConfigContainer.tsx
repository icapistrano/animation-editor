import { FunctionComponent, ReactNode } from "react";

export const ConfigContainer: FunctionComponent<{
  topLeft: ReactNode;
  topRight?: ReactNode;
  children: ReactNode;
}> = ({ topLeft, topRight, children }) => {
  return (
    <div className="rounded-lg p-4 bg-primary border border-5 border-secondary">
      <div className="flex justify-between items-center mx-2 pb-1">
        {topLeft}
        {topRight !== undefined && topRight}
      </div>

      <div className="border-t border-secondary mt-2 mb-4"></div>

      <div className="px-4">{children}</div>
    </div>
  );
};
