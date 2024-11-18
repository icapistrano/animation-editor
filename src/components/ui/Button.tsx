import { FunctionComponent, ReactNode } from "react";

export const Button: FunctionComponent<{
  icon: ReactNode;
  text: string;
}> = ({ icon, text }) => {
  return (
    <button className="flex items-center gap-x-1.5 px-3 py-2 border rounded-lg">
      {icon}
      <span className="text-md">{text}</span>
    </button>
  );
};
