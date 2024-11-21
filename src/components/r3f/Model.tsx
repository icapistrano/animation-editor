import { Box } from "@react-three/drei";
import { FC } from "react";

export const Model: FC = () => {
  return (
    <>
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshBasicMaterial color={"red"} />
        <axesHelper scale={10} />
      </Box>

      {/* <Sphere position={[0, 0, 2]} /> */}
    </>
  );
};
