// components/AlertPolygon.tsx
import * as THREE from "three";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

type AlertPolygonProps = {
  geometry: {
    type: "Polygon";
    coordinates: number[][][]; // [ [ [lon, lat], [lon, lat], ... ] ]
  };
  radius?: number; // Radius of the globe
  color?: string;
};

export default function AlertPolygon({
  geometry,
  radius = 1,
  color = "red",
}: AlertPolygonProps) {
  const shape = useMemo(() => {
    const coords = geometry.coordinates[0]; // outer ring of polygon
    const vertices: THREE.Vector3[] = [];

    for (const [lon, lat] of coords) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      vertices.push(new THREE.Vector3(x, y, z));
    }

    const shapeGeometry = new THREE.BufferGeometry();

    // Triangulate polygon into a fan for now
    const positions: number[] = [];
    for (let i = 1; i < vertices.length - 1; i++) {
      const a = vertices[0];
      const b = vertices[i];
      const c = vertices[i + 1];

      positions.push(...a.toArray(), ...b.toArray(), ...c.toArray());
    }

    shapeGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    return shapeGeometry;
  }, [geometry, radius]);

  return (
    <mesh geometry={shape}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
