const Floor: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[10, 8]} />
      <meshStandardMaterial color="#B8B8B8" />
    </mesh>
  );
};

export default Floor;
