import { OrbitControls } from "@react-three/drei";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { cameraConfigStore } from "../../state-management/CameraConfig.store";
import { CameraHelper } from "./CameraHelper";

export const InteractiveScene: FC = observer(() => {
  const { fov, width, height, near, far, cameras, selectedCamera } = cameraConfigStore;

  const [isOrbitControlsEnabled, setIsOrbitControlsEnabled] = useState(true);

  return (
    <Canvas>
      {/* Scene control */}
      <OrbitControls target={[2.5, 0, 2.5]} enabled={isOrbitControlsEnabled} />

      {selectedCamera && (
        <CameraHelper
          key={"lerp-camera"}
          fov={fov}
          aspectRatio={width / height}
          near={near}
          far={far}
          position={selectedCamera.position}
          lookAt={selectedCamera.lookAt}
        />
      )}

      {/* All camera */}
      {cameras.map(({ label, position, lookAt }) => (
        <CameraHelper
          key={label}
          fov={fov}
          aspectRatio={width / height}
          near={near}
          far={far}
          position={position}
          lookAt={lookAt ?? [0, 0, 0]}
        />
      ))}

      {/* Model */}
      <Model />
    </Canvas>
  );
});
