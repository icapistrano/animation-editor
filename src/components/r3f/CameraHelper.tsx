import { useHelper } from "@react-three/drei";
import { FunctionComponent, useEffect, useRef } from "react";
import { CameraHelper as _cameraHelper, PerspectiveCamera, Vector3 } from "three";

export const CameraHelper: FunctionComponent<{
  fov: number;
  aspectRatio: number;
  near: number;
  far: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  rotation: [number, number, number];
}> = ({ fov, aspectRatio, near, far, position, lookAt, rotation }) => {
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  useHelper(cameraRef as React.MutableRefObject<PerspectiveCamera>, _cameraHelper);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(new Vector3().fromArray(lookAt));
    }
  }, [lookAt]);

  return (
    <perspectiveCamera
      onUpdate={(self) => self.lookAt(new Vector3().fromArray(lookAt))}
      ref={cameraRef}
      position={position}
      rotation={rotation}
      fov={fov}
      aspect={aspectRatio}
      near={near}
      far={far}
    ></perspectiveCamera>
  );
};
