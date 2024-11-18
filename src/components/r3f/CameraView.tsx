import { FC, useRef } from "react";
import { Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { observer } from "mobx-react";
import { cameraConfigStore } from "../../state-management/CameraConfig.store";

export const CameraView: FC = observer(() => {
  const { fov, width, height, near, far, selectedCamera } = cameraConfigStore;

  const idealWidth = 400; // TODO: 30% of screen width
  const idealHeight = idealWidth / (width / height);

  const canvasBRef = useRef(null);

  if (!selectedCamera) return null;

  return (
    <div
      ref={canvasBRef}
      className="text-white absolute top-0 right-0 m-2 border-secondary border-2 border-secondary"
      style={{ width: idealWidth, height: idealHeight }}
    >
      <Canvas>
        <PerspectiveCamera
          onUpdate={(self) => self.lookAt(new Vector3().fromArray(selectedCamera.lookAt))}
          makeDefault
          position={selectedCamera.position}
          fov={fov}
          aspect={width / height}
          near={near}
          far={far}
          zoom={1}
        />

        <Model />
      </Canvas>
    </div>
  );
});
