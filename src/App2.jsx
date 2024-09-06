import { Canvas, useFrame } from "@react-three/fiber"
import "./App.css"
import { useReducer, useRef } from "react"
import { OrbitControls, TransformControls, useHelper, useTexture } from "@react-three/drei"
import { BoxHelper, DirectionalLightHelper, MeshStandardMaterial } from "three"

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Tree from "./components/Tree"
import SpherePlayer from "./components/SpherePlayer"



const Cube = ({position , size , color}) =>{
  const ref = useRef()
  useHelper(ref,BoxHelper,"green")

  const mapcube = useTexture("../textures/gray_rocks_diff_2k.png");
  const normalMapcube = useTexture("../textures/gray_rocks_nor_gl_2k.png");

  useFrame((state,delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 5
    
  })
  return(
    <mesh position={position}  ref={ref} castShadow >
        <boxGeometry args={size} />
        <meshStandardMaterial   
         map={mapcube}
         normalMap={normalMapcube}/>
    </mesh>

  )
}

const Sphere = ({position , size , color}) =>{
  const ref = useRef()

  
  const map = useTexture("../textures/gray_rocks_diff_2k.png");
  const displacementMap = useTexture("../textures/gray_rocks_disp_2k.png");
  const normalMap = useTexture("../textures/gray_rocks_nor_gl_2k.png");
  const roughMap = useTexture("../textures/gray_rocks_rough_2k.png");
    


  useFrame((state,delta) => {
    ref.current.rotation.y += delta

  })
  return(
    <TransformControls>
    <mesh position={position}  ref={ref} castShadow  >
        <sphereGeometry args={size} />
        <meshStandardMaterial 
        map={map}
        normalMap={normalMap}
        roughnessMap={roughMap}
        displacementMap={displacementMap}/>
    </mesh>
    </TransformControls>

  )
}

const Lights = () => {
  const lightRef = useRef();

  useHelper(lightRef, DirectionalLightHelper, 5, "red"); 

  return (
    <>
      {/* Apply the ref to the light */}
      <directionalLight
        ref={lightRef}
        position={[0, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}   
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={50}        
        shadow-camera-left={-20}      
        shadow-camera-right={20}      
        shadow-camera-top={20}        
        shadow-camera-bottom={-20}
      />
      <ambientLight intensity={0.5} />
    </>
  );
};





const App = () =>{
    const test = true
  

  return (
    <Canvas shadows camera={{ position: [0, 14, -10], fov: 75 }} >
      {test ? <axesHelper/> : null}
      {test ? <gridHelper/> : null}
      <Lights />
      
      
        

      
      <Cube position = {[3,3,0]} size = {[1,1,1]} color = {"orange"} castShadow/>
      <Cube position = {[-3,3,0]} size = {[1,1,1]} color = {"orange"} castShadow/>
      <Sphere position = {[0,2,0]} size = {[1,30,30]} color = {"orange"} castShadow/>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[500,500]} />
        <meshStandardMaterial color={"green"}/>
      </mesh>
      <SpherePlayer position={[4, 0.4, 0]} size={[0.3, 30, 30]} color="orange" />
      
      <OrbitControls/>
      <Tree position= {[2,0,-5]}/>
      <Tree position= {[-4,0,-5]}/>
    </Canvas>
  )
}

export default App
