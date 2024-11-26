import classNames from "classnames";
import { FunctionComponent, ReactNode } from "react";

export const Button: FunctionComponent<{
  icon: ReactNode;
  style?: "primary" | "ghost";
  onClick?: () => void;
  tooltipMessage?: string;
  isDisabled?: boolean;
}> = ({ icon, style = "primary", onClick, tooltipMessage, isDisabled = false }) => {
  return (
    <button
      className={classNames("flex items-center gap-x-2 rounded-md group relative p-2", {
        "hover:bg-tertiary": style === "primary" && !isDisabled,
        "opacity-50": isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon}
      {tooltipMessage !== undefined && !isDisabled && (
        <div className="absolute w-max right-14 hidden group-hover:block bg-secondary px-4 py-2 rounded-md">
          {tooltipMessage}
          <div className="absolute top-1/2 -translate-y-1/2 right-0.5 translate-x-full border-8 border-transparent border-l-secondary"></div>
        </div>
      )}
    </button>
  );
};
