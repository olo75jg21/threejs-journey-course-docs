import { useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BallCollider, Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience() {
    const [hitSound] = useState(() => new Audio('./hit.mp3'))

    const cube = useRef(null)
    const twister = useRef(null)

    const cubeJump = () => {
        const mass = cube.current.mass()
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
        cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 })
    }

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()

        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5;
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3

        twister.current.setNextKinematicTranslation({ x, y: -0.8, z })
    })

    const collisionEnter = () => {
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <Physics debug gravity={[0, -9.08, 0]}>
            <RigidBody colliders='ball'>
                <mesh castShadow position={[-1.5, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={cube}
                position={[1.5, 2, 0]}
                gravityScale={1}
                restitution={0}
                friction={0.7}
                colliders={false}
                onCollisionEnter={collisionEnter}
                onCollisionExit={() => { console.log('exit') }}
            >
                <mesh
                    castShadow
                    onClick={cubeJump}
                >
                    <boxGeometry />
                    <meshStandardMaterial color='mediumpurple' />
                </mesh>
                <CuboidCollider
                    args={[0.5, 0.5, 0.5]}
                    mass={2}
                />
            </RigidBody>

            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={- 1.25} friction={0.7}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={twister}
                position={[0, -0.8, 0]}
                friction={0}
                type="kinematicPosition"
            >
                <mesh castShadow scale={[0.4, 0.4, 3]}>
                    <boxGeometry />
                    <meshStandardMaterial color='red' />
                </mesh>
            </RigidBody>
        </Physics>
    </>
}