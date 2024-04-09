import { useFrame, extend, useThree } from '@react-three/fiber'
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import CustomObject from './CustomObject';

extend({ OrbitControls })

export default function Experience() {
  const groupRef = useRef()
  const cubeRef = useRef();

  const { camera, gl } = useThree()

  useFrame((state, delta) => {
    // state.camera.position.x = Math.sin(state.clock.elapsedTime) * 10
    // state.camera.position.z = Math.cos(state.clock.elapsedTime) * 10
    // state.camera.lookAt(groupRef.current.position)
    cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y += delta
  })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      {/* <directionalLight position={[1, 2, 3]} intensity={4.5} /> */}
      {/* <ambientLight intensity={1.5} /> */}

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry scale={1} />
          <meshStandardMaterial color='orange' />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color='mediumpurple' />
        </mesh>

      </group>

      <mesh rotation-x={- Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry scale={1} />
        <meshStandardMaterial color='greenyellow' />
      </mesh>

      <CustomObject />
    </>
  )
}