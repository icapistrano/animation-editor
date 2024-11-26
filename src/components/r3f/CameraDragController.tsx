import { Billboard, DragControls, Line, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useMemo, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

export const CameraDragController: FC<{
  color?: string;
  lockAxis?: "x" | "y" | "z";
  defaultPosition: [number, number, number];
  setPosition: (position: [number, number, number]) => void;
}> = ({ color = "blue", defaultPosition, setPosition, lockAxis }) => {
  const isHovering = useRef(false);
  const worldV = useMemo(() => new Vector3(), []);
  const [dashedOffset, setDashedOffset] = useState(0);

  const sphereRef = useRef<Mesh>(null);
  useFrame(({ camera }) => {
    if (sphereRef.current) {
      const distance = camera.position.distanceTo(worldV) / 50;
      sphereRef.current.scale.set(distance, distance, distance);

      if (isHovering.current) {
        sphereRef.current.getWorldPosition(worldV);
        setPosition(worldV.toArray());
        setDashedOffset(dashedOffset + 0.01);
      }
    }
  });

  return (
    <group>
      <DragControls onHover={(onHover) => (isHovering.current = onHover)} axisLock={lockAxis}>
        <Sphere ref={sphereRef} position={defaultPosition}>
          <meshBasicMaterial color={color} transparent opacity={0} />
          <Billboard>
            <CircleLine dashedOffset={dashedOffset} />
          </Billboard>
        </Sphere>
      </DragControls>
    </group>
  );
};

const CircleLine: FC<{
  radius?: number;
  color?: string;
  segments?: number;
  lineWidth?: number;
  dashedOffset: number;
}> = ({ radius = 1, color = "white", segments = 64, lineWidth = 2, dashedOffset }) => {
  // Generate circle points
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2; // Full circle
    points.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]); // XY plane
  }

  return (
    <Line
      points={points} // The points that make up the line
      color={color} // Line color
      lineWidth={lineWidth} // Line width
      dashed
      dashOffset={dashedOffset}
      dashSize={0.2}
      gapSize={0.2}
    />
  );
};
