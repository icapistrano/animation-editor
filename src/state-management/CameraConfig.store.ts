import { makeAutoObservable } from "mobx";
import { Texture } from "three";

export interface ISelectedCameraData {
  uuid: string;
  texture: string;
}

interface CameraMetadata {
  label: string;
  position: [number, number, number];
  lookAt: [number, number, number];
}

class CameraConfigStore {
  fov = 50;
  width = 300;
  height = 200;
  near = 1;
  far = 100;

  texture?: Texture;

  selectedCameraId?: string = "uuid1";

  cameraById = new Map<string, CameraMetadata>([
    [
      "uuid1",
      {
        label: "Close Shot 1",
        position: [0, 20, 0],
        lookAt: [0, 0, 0],
      },
    ],
    // [
    //   "uuid2",
    //   {
    //     label: "Close Shot 2",
    //     position: [10, 10, 10],
    //     lookAt: [0, 0, 0],
    //   },
    // ],
  ]);

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get cameras() {
    return Array.from(this.cameraById.values());
  }

  get selectedCamera() {
    if (!this.selectedCameraId) return;

    return this.cameraById.get(this.selectedCameraId);
  }

  setFov(fov: number) {
    this.fov = fov;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  setNear(near: number) {
    this.near = near;
  }

  setFar(far: number) {
    this.far = far;
  }

  setRenderTexture(texture?: Texture) {
    this.texture = texture;
  }

  setSelectedCameraData(selectedCameraId: string) {
    this.selectedCameraId = selectedCameraId;
  }
}

export const cameraConfigStore = new CameraConfigStore();
