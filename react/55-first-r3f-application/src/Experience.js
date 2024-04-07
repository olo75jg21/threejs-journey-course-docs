import { useFrame } from '@react-three/fiber'
import { useRef } from 'react';

export default function Experience() {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
  })

  return (
    <>
      <mesh position-x={-2}>
        <sphereGeometry scale={1} />
        <meshBasicMaterial color='orange' />
      </mesh>

      <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
        <boxGeometry scale={1.5} />
        <meshBasicMaterial color='mediumpurple' />
      </mesh>

      <mesh rotation-x={- Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry scale={1} />
        <meshBasicMaterial color='greenyellow' />
      </mesh>
    </>
  )
}