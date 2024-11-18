import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { observer } from "mobx-react";
import { FC } from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { cameraConfigStore } from "../../state-management/CameraConfig.store";
import { CameraHelper } from "./CameraHelper";
import { Vector3 } from "three";

export const InteractiveScene: FC = observer(() => {
  const { fov, width, height, near, far, cameras, selectedCamera } = cameraConfigStore;

  return (
    <Canvas>
      {/* Scene control */}
      <OrbitControls target={[2.5, 0, 2.5]} />

      {/* Scene main camera */}
      {selectedCamera !== undefined ? (
        <PerspectiveCamera
          makeDefault
          position={selectedCamera.position}
          onUpdate={(self) => {
            self.lookAt(new Vector3().fromArray(selectedCamera.lookAt));
          }}
        ></PerspectiveCamera>
      ) : (
        <PerspectiveCamera
          makeDefault
          position={[0, 20, 0]}
          rotation={[(Math.PI / 180) * -90, 0, 0]}
        ></PerspectiveCamera>
      )}

      {/* All camera */}
      {cameras.map(({ position, lookAt }) => (
        <CameraHelper
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
