import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';

const SpherePlayer = ({ position, size, color }) => {
  const ref = useRef<Mesh>(!null);
  const { camera } = useThree(); 
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          setMovement((m) => ({ ...m, forward: true }));
          break;
        case 's':
          setMovement((m) => ({ ...m, backward: true }));
          break;
        case 'a':
          setMovement((m) => ({ ...m, left: true }));
          break;
        case 'd':
          setMovement((m) => ({ ...m, right: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'w':
          setMovement((m) => ({ ...m, forward: false }));
          break;
        case 's':
          setMovement((m) => ({ ...m, backward: false }));
          break;
        case 'a':
          setMovement((m) => ({ ...m, left: false }));
          break;
        case 'd':
          setMovement((m) => ({ ...m, right: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (ref.current) {
      if (movement.forward) ref.current.position.z -= 0.1;
      if (movement.backward) ref.current.position.z += 0.1;
      if (movement.left) ref.current.position.x -= 0.1;
      if (movement.right) ref.current.position.x += 0.1;

      
      camera.position.x = ref.current.position.x; 
      camera.position.z = ref.current.position.z + 15; 
      camera.position.y = ref.current.position.y + 6; 
      camera.lookAt(ref.current.position); 
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default SpherePlayer;
