import { FC, useMemo } from "react";
import { CameraMetadata } from "../../state-management/CameraConfig.store";
import { Vector3 } from "three";
import { CameraDragController } from "./CameraDragController";
import { CameraHelper } from "./CameraHelper";

export const CameraController: FC<{
  fov: number;
  aspectRatio: number;
  near: number;
  far: number;
  camera: CameraMetadata;
  updateCamera: (camera: Partial<CameraMetadata>) => void;
  lockAxis?: "x" | "y" | "z";
}> = ({ camera, fov, aspectRatio, near, far, updateCamera, lockAxis }) => {
  const temp = useMemo(() => {
    return {
      ...camera,
      lookAt: new Vector3()
        .fromArray(camera.position)
        .add(new Vector3(0, 0, -far))
        .toArray(),
    };
  }, []);

  const setPosition = (position: [number, number, number]) => {
    updateCamera({ ...camera, position });
  };

  const setLookAt = (lookAt: [number, number, number]) => {
    updateCamera({ ...camera, lookAt });
  };

  return (
    <>
      <CameraDragController color="red" defaultPosition={temp.lookAt} setPosition={setLookAt} lockAxis={lockAxis} />
      <CameraDragController defaultPosition={temp.position} setPosition={setPosition} lockAxis={lockAxis} />

      <CameraHelper
        fov={fov}
        aspectRatio={aspectRatio}
        near={near}
        far={far}
        position={camera.position}
        lookAt={camera.lookAt}
        rotation={[0, 0, 0]}
      />
    </>
  );
};
