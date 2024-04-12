import { useRef } from 'react'
import { MeshReflectorMaterial, OrbitControls, Text, Float, Html, TransformControls, PivotControls } from '@react-three/drei'
import { MeshNormalMaterial } from 'three'

export default function Experience() {
    const cube = useRef()
    const sphere = useRef()

    return <>
        <OrbitControls makeDefault />
        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            fixed
            scale={100}
        >
            <mesh ref={sphere} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    center
                    position={[1, 1, 0]}
                    wrapperClass='label'
                    distanceFactor={8}
                    occlude={[sphere, cube]}
                >
                    That's a sphere
                </Html>
            </mesh>
        </PivotControls>

        <mesh scale={1.5} position-x={2} ref={cube}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <TransformControls object={cube} mode='translate' />

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial resolution={512} color="greenyellow" />
        </mesh>

        <Float>
            <Text
                fontSize={1}
                color="salmon"
                font="./bangers-v20-latin-regular.woff"
                maxWidth={2}
            >
                I Love R3F
            </Text>
        </Float>

    </>
}