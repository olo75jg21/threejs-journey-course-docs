import { useFrame } from '@react-three/fiber'
import { Environment, Sky, ContactShadows, AccumulativeShadows, SoftShadows, useHelper, BakeShadows, OrbitControls, RandomizedLight, Lightformer } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience() {
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime

        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#000000',
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 }
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity } = useControls('environmentMap', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    })

    return <>
        <Environment
            preset='sunset'
            ground={{
                height: 7,
                radius: 28,
                scale: 100
            }}
        >
            {/* <color args={['black']} attach='background' />
            <Lightformer
                position-z={-5}
                scale={10}
                color='red'
                intensity={2}
                form='ring'
            /> */}
            {/* <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={[2, 0, 0]} />
            </mesh> */}
        </Environment>

        {/* <BakeShadows /> */}
        <SoftShadows size={25} samples={10} focus={0} />

        <color args={['#f3f0f0']} attach='background' />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={Infinity}
            blend={100}
            temporal
        >
            <RandomizedLight
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={3}
                position={[1, 2, 3]}
                bias={0.001}
            />
        </AccumulativeShadows> */}

        <ContactShadows
            position={[0, -0.99, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={color}
            opacity={opacity}
            blur={blur}
            frames={1}
        />

        {/* <directionalLight
            ref={directionalLight}
            position={[1, 2, 3]}
            intensity={4.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-letft={-5}
        />
        <ambientLight intensity={1.5} /> */}

        {/* <Sky sunPosition={sunPosition} /> */}

        <mesh position-x={- 2} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh>

    </>
}