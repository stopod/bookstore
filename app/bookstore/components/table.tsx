type TableProps = {
  position: [number, number, number];
};

const Table: React.FC<TableProps> = ({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 0.05, 0.7]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      {/* 脚 */}
      <mesh position={[-0.45, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.45, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.45, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.45, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* テーブルの上の本 */}
      <mesh position={[0.2, 0.45, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#FF6347" />
      </mesh>
      <mesh position={[-0.1, 0.47, 0.1]}>
        <boxGeometry args={[0.15, 0.04, 0.25]} />
        <meshStandardMaterial color="#4682B4" />
      </mesh>
    </group>
  );
};

export default Table;
