const BookstoreSign: React.FC = () => {
  return (
    <group position={[0, 1, -3.9]}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* フォントの読み込みに問題があったので簡易的な表示に変更 */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.8, 0.3, 0.01]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
};

export default BookstoreSign;
