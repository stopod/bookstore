export type BookProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
  color: string;
};

const Book: React.FC<BookProps> = ({ position, rotation, size, color }) => {
  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={() => window.alert("Book clicked!")}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Book;
