import { Canvas, useFrame } from "@react-three/fiber"
import "./App.css"
import { useRef } from "react"
import { OrbitControls } from "@react-three/drei"

const Cube = ({position , size , color}) =>{
  const ref = useRef()

  useFrame((state,delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 5
    
  })
  return(
    <mesh position={position}  ref={ref} >
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>

  )
}

const Sphere = ({position , size , color}) =>{
  const ref = useRef()

  useFrame((state,delta) => {
    ref.current.rotation.y += delta
    
    
  })
  return(
    <mesh position={position}  ref={ref} >
        <sphereGeometry args={size} />
        <meshStandardMaterial color={color} wireframe/>
    </mesh>

  )
}




const App = () =>{
  

  return (
    <Canvas>
      <directionalLight position={[0,0,2]} />
      <ambientLight />

      {/* <group position={[0,-1,0]}>
      <Cube position = {[1,0,0]} size = {[1,1,1]} color = {"orange"} />
      <Cube position = {[-1,0,0]} size = {[1,1,1]} color = {"hotpink"} />
      <Cube position = {[-1,2,0]} size = {[1,1,1]} color = {"blue"} />
      <Cube position = {[1,2,0]} size = {[1,1,1]} color = {"green"} />
      </group>  */}
      <Cube position = {[1,0,0]} size = {[1,1,1]} color = {"orange"} />
      <Cube position = {[-1,0,0]} size = {[1,1,1]} color = {"orange"} />
      <Sphere position = {[-3,0,0]} size = {[1,30,30]} color = {"orange"} />

      
      <OrbitControls/>
    </Canvas>
  )
}

export default App
