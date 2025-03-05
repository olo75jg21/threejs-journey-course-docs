import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import Level from './Level.js'
import Player from './Player.js'
import useGame from './stores/useGame.js'

export default function Experience() {
    const blocksCount = useGame((state) => state.blocksCount)

    return <>
        <Physics debug={false}>
            <Lights />
            <Level count={blocksCount} />
            <Player />
        </Physics>
    </>
}