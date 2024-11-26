import { IconCheck, IconLock, IconTrash, IconX } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Button } from "./Button";
import { observer } from "mobx-react";
import { cameraConfigStore } from "../../state-management/CameraConfig.store";
import classNames from "classnames";

type SubMenuType = "Lock axis" | "Delete";

export const ControlBar: FC = observer(() => {
  const { selectedCamera, setSelectedCamera, deleteCamera, axis, lockAxis } = cameraConfigStore;

  const [mode, setMode] = useState<SubMenuType>();

  const onToggleMode = (newMode: SubMenuType) => {
    if (mode === undefined) {
      setMode(newMode);
    } else {
      setMode(undefined);
    }
  };

  const onToggleAxis = (newAxis: "x" | "y" | "z") => {
    if (axis === undefined) {
      lockAxis(newAxis);
    } else {
      lockAxis(undefined);
    }
  };

  if (!selectedCamera) return null;

  return (
    <div className="bg-secondary rounded-md px-2 py-2 flex flex-col gap-y-1">
      {/* Save changes */}
      <Button icon={<IconCheck />} tooltipMessage="Save changes" isDisabled={mode !== undefined} />

      {/* Discard changes */}
      <Button
        icon={<IconX />}
        onClick={() => setSelectedCamera(undefined)}
        tooltipMessage="Discard changes"
        isDisabled={mode !== undefined}
      />

      {/* Lock axis */}
      <div className="relative">
        <Button
          icon={<IconLock color={mode === "Lock axis" ? "#f26419" : undefined} />}
          tooltipMessage={mode === "Lock axis" ? undefined : "Lock axis"}
          onClick={() => onToggleMode("Lock axis")}
          isDisabled={![undefined, "Lock axis"].includes(mode)}
        />

        {mode === "Lock axis" && (
          <div className="absolute right-14 bg-secondary rounded-md px-4 py-2 h-max w-max -translate-y-1/2">
            <h2 className="my-1">Lock axis</h2>
            <div className="flex justify-between gap-x-3">
              <AxisButton axis="X" onClick={() => onToggleAxis("x")} isSelected={axis === "x"} />
              <AxisButton axis="Y" onClick={() => onToggleAxis("y")} isSelected={axis === "y"} />
              <AxisButton axis="Z" onClick={() => onToggleAxis("z")} isSelected={axis === "z"} />
            </div>
          </div>
        )}
      </div>

      {/* Delete keyframe */}
      <div className="relative">
        <Button
          icon={<IconTrash color={mode === "Delete" ? "#f26419" : undefined} />}
          tooltipMessage={mode === "Delete" ? undefined : "Delete keyframe"}
          onClick={() => onToggleMode("Delete")}
          isDisabled={![undefined, "Delete"].includes(mode)}
        />

        {mode === "Delete" && (
          <div className="absolute right-14 bg-secondary rounded-md px-4 py-2 h-max w-max -translate-y-1/2">
            <h2 className="my-1">Delete keyframe?</h2>
            <div className="flex justify-center gap-x-3">
              <Button icon={<span>Yes</span>} onClick={deleteCamera} />
              <Button icon={<span>No</span>} onClick={() => onToggleMode("Delete")} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const AxisButton: FC<{
  axis: "X" | "Y" | "Z";
  onClick: () => void;
  isSelected?: boolean;
}> = ({ axis, onClick, isSelected = false }) => {
  return (
    <div
      className={classNames(
        "w-7 h-7 hover:bg-tertiary hover:cursor-pointer rounded-full text-center flex items-center justify-center text-xs",
        {
          "text-primary": isSelected,
        },
      )}
      onClick={onClick}
    >
      {axis}
    </div>
  );
};
