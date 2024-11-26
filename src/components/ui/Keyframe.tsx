import { IconDiamondsFilled } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";

export const Keyframe: FC<{
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  onHoverChange: (isHovered: boolean) => void;
}> = ({ isSelected = true, isDisabled = false, onClick, onHoverChange }) => {
  return (
    <IconDiamondsFilled
      onMouseEnter={() => !isDisabled && onHoverChange(true)}
      onMouseLeave={() => !isDisabled && onHoverChange(false)}
      color={isSelected ? "red" : "white"}
      className={classNames({
        "hover:cursor-move": isSelected,
        "hover:cursor-not-allowed": isDisabled,
        "hover:cursor-pointer": !isSelected && !isDisabled,
      })}
      size={34}
      onClick={() => !isDisabled && onClick()}
    />
  );
};
