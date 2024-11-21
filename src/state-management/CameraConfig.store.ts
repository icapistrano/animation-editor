import { makeAutoObservable } from "mobx";
import { Vector3 } from "three";

export interface ISelectedCameraData {
  uuid: string;
  texture: string;
}

interface CameraMetadata {
  label: string;
  position: [number, number, number];
  lookAt: [number, number, number];
  timestamp: number;
}

class CameraConfigStore {
  // camera config
  fov = 50;
  width = 300;
  height = 200;
  near = 1;
  far = 200;

  // timeline config
  max = 10000;
  interval = 1000;
  intermediateInterval = 200;
  currentTimestamp = 0;

  v1 = new Vector3();
  v2 = new Vector3();

  cameraById = new Map<string, CameraMetadata>([
    [
      "uuid1",
      {
        label: "Close Shot 1",
        position: [0, 20, 0],
        lookAt: [0, 0, 0],
        timestamp: 0,
      },
    ],
    [
      "uuid2",
      {
        label: "Close Shot 2",
        position: [30, 30, 10],
        lookAt: [0, 0, 0],
        timestamp: 2000,
      },
    ],
    [
      "uuid3",
      {
        label: "Close Shot 3",
        position: [50, 30, 30],
        lookAt: [0, 0, 0],
        timestamp: 50000,
      },
    ],
    [
      "uuid4",
      {
        label: "Close Shot 4",
        position: [0, 20, 0],
        lookAt: [0, 0, 0],
        timestamp: 10000,
      },
    ],
  ]);

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  setCurrentTimestamp(timestamp: number) {
    this.currentTimestamp = timestamp;
  }

  get selectedCamera(): CameraMetadata | null {
    const sortedCameras = this.cameras.sort((a, b) => a.timestamp - b.timestamp);

    if (this.currentTimestamp === 0) return sortedCameras[0];

    let cameraToIdx = sortedCameras.findIndex((a) => a.timestamp > this.currentTimestamp);
    cameraToIdx = cameraToIdx !== -1 ? cameraToIdx : sortedCameras.length - 1;

    const cameraTo = sortedCameras[cameraToIdx];
    const cameraFrom = sortedCameras[cameraToIdx - 1];

    if (!cameraFrom || !cameraTo) return null;

    const alpha = this.normalize(this.currentTimestamp, cameraFrom.timestamp, cameraTo.timestamp);
    const position = this.lerp(cameraFrom.position, cameraTo.position, alpha);
    const lookAt = this.lerp(cameraFrom.lookAt, cameraTo.lookAt, alpha);

    return {
      label: "lerp-camera",
      lookAt,
      position,
      timestamp: this.currentTimestamp,
    };
  }

  get cameras() {
    return Array.from(this.cameraById.values());
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

  // HELPERS
  normalize(value: number, min: number, max: number) {
    return (value - min) / (max - min);
  }

  lerp(v1: [number, number, number], v2: [number, number, number], alpha: number): [number, number, number] {
    this.v1.set(v1[0], v1[1], v1[2]);
    this.v2.set(v2[0], v2[1], v2[1]);

    return [...this.v1.lerp(this.v2, alpha).toArray()];
  }
}

export const cameraConfigStore = new CameraConfigStore();
