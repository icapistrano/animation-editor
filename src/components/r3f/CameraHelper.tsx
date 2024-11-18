import { useHelper } from "@react-three/drei";
import { FunctionComponent, useRef } from "react";
import { CameraHelper as _cameraHelper, PerspectiveCamera, Vector3 } from "three";

export const CameraHelper: FunctionComponent<{
  fov: number;
  aspectRatio: number;
  near: number;
  far: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}> = ({ fov, aspectRatio, near, far, position, lookAt }) => {
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  useHelper(cameraRef as React.MutableRefObject<PerspectiveCamera>, _cameraHelper);

  return (
    <perspectiveCamera
      onUpdate={(self) => self.lookAt(new Vector3().fromArray(lookAt))}
      ref={cameraRef}
      position={position}
      fov={fov}
      aspect={aspectRatio}
      near={near}
      far={far}
    ></perspectiveCamera>
  );
};
