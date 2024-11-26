import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { observer } from "mobx-react";
import { FC } from "react";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { cameraConfigStore } from "../../state-management/CameraConfig.store";
import { CameraController } from "./CameraController";

export const InteractiveScene: FC = observer(() => {
  const { fov, width, height, near, far, selectedCamera, updateCamera, axis } = cameraConfigStore;

  return (
    <Canvas>
      <scene up={[0, 0, 1]}>
        <PerspectiveCamera makeDefault position={[80, 80, 0]} up={[0, 0, 1]} />

        {/* Scene control */}
        <OrbitControls makeDefault target={[2.5, 0, 2.5]} maxDistance={500} zoomToCursor />

        {selectedCamera && (
          <CameraController
            fov={fov}
            aspectRatio={width / height}
            near={near}
            camera={selectedCamera}
            far={far}
            updateCamera={updateCamera}
            lockAxis={axis}
          />
        )}

        {/* Model */}
        <Model />
      </scene>
    </Canvas>
  );
});
