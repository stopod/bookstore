import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import Book, { type BookProps } from "./components/book";
import Floor from "./components/floor";
import Table from "./components/table";
import BookstoreSign from "./components/bookstoreSign";

type BookshelfProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  size?: [number, number, number];
};

const Bookshelf: React.FC<BookshelfProps> = ({
  position,
  rotation,
  size = [1, 2, 0.3],
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* 本棚の背面 */}
      <mesh position={[0, 0, -0.14]}>
        <boxGeometry args={[size[0], size[1], 0.02]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 棚板（上部） */}
      <mesh position={[0, size[1] / 2 - 0.05, 0]}>
        <boxGeometry args={[size[0], 0.03, size[2]]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* 棚板（下部） */}
      <mesh position={[0, -size[1] / 2 + 0.05, 0]}>
        <boxGeometry args={[size[0], 0.03, size[2]]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* 棚板（中央） */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size[0], 0.03, size[2]]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* 側面（左） */}
      <mesh position={[-size[0] / 2 + 0.02, 0, 0]}>
        <boxGeometry args={[0.04, size[1], size[2]]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 側面（右） */}
      <mesh position={[size[0] / 2 - 0.02, 0, 0]}>
        <boxGeometry args={[0.04, size[1], size[2]]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 本を配置 */}
      <Books shelfWidth={size[0]} shelfHeight={size[1]} />
    </group>
  );
};

type BooksProps = {
  shelfWidth: number;
  shelfHeight: number;
};

const Books: React.FC<BooksProps> = ({ shelfWidth, shelfHeight }) => {
  const getRandomColor = (): string => {
    const colors = [
      "#ff4136",
      "#0074d9",
      "#2ecc40",
      "#ffdc00",
      "#b10dc9",
      "#ff851b",
      "#7fdbff",
      "#3d9970",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // 上の棚の本
  const topShelfBooks: BookProps[] = [];
  let currentX = -shelfWidth / 2 + 0.1;

  while (currentX < shelfWidth / 2 - 0.1) {
    const bookWidth = Math.random() * 0.05 + 0.03;
    const bookHeight = Math.random() * 0.2 + 0.2;

    topShelfBooks.push({
      position: [currentX + bookWidth / 2, shelfHeight / 4 + bookHeight / 2, 0],
      size: [bookWidth, bookHeight, 0.2],
      color: getRandomColor(),
      rotation: [0, 0, 0],
    });

    currentX += bookWidth + 0.01;
  }

  // 下の棚の本
  const bottomShelfBooks: BookProps[] = [];
  currentX = -shelfWidth / 2 + 0.1;

  while (currentX < shelfWidth / 2 - 0.1) {
    const bookWidth = Math.random() * 0.05 + 0.03;
    const bookHeight = Math.random() * 0.2 + 0.2;

    // たまに本を倒して置く
    const isLying = Math.random() > 0.7;

    if (isLying) {
      bottomShelfBooks.push({
        position: [currentX + 0.1, -shelfHeight / 4 + 0.1, 0],
        size: [0.2, bookWidth, bookHeight],
        color: getRandomColor(),
        rotation: [0, 0, Math.PI / 2],
      });
      currentX += bookHeight + 0.02;
    } else {
      bottomShelfBooks.push({
        position: [
          currentX + bookWidth / 2,
          -shelfHeight / 4 + bookHeight / 2,
          0,
        ],
        size: [bookWidth, bookHeight, 0.2],
        color: getRandomColor(),
        rotation: [0, 0, 0],
      });
      currentX += bookWidth + 0.01;
    }
  }

  return (
    <>
      {topShelfBooks.map((book, i) => (
        <Book
          key={`top-${i}`}
          position={book.position}
          size={book.size}
          color={book.color}
          rotation={book.rotation}
        />
      ))}
      {bottomShelfBooks.map((book, i) => (
        <Book
          key={`bottom-${i}`}
          position={book.position}
          size={book.size}
          color={book.color}
          rotation={book.rotation}
        />
      ))}
    </>
  );
};

const Walls: React.FC = () => {
  return (
    <>
      {/* 背面の壁 */}
      <mesh position={[0, 0, -4]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#E8E0D5" side={THREE.DoubleSide} />
      </mesh>

      {/* 左の壁 */}
      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#F5F5DC" side={THREE.DoubleSide} />
      </mesh>

      {/* 右の壁 */}
      <mesh position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#F5F5DC" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

const BookstoreScene: React.FC = () => {
  // カメラの初期位置を設定
  const CameraController: React.FC = () => {
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(0, 1, 4);
    }, [camera]);
    return null;
  };

  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        <Floor />
        <Walls />
        <BookstoreSign />

        {/* 両側の本棚 */}
        <Bookshelf position={[-4, 0, -3.5]} rotation={[0, 0, 0]} />
        <Bookshelf position={[-2, 0, -3.5]} rotation={[0, 0, 0]} />
        <Bookshelf position={[2, 0, -3.5]} rotation={[0, 0, 0]} />
        <Bookshelf position={[4, 0, -3.5]} rotation={[0, 0, 0]} />

        {/* 左壁際の本棚 */}
        <Bookshelf position={[-4.7, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
        <Bookshelf position={[-4.7, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
        <Bookshelf position={[-4.7, 0, 3]} rotation={[0, Math.PI / 2, 0]} />

        {/* 右壁際の本棚 */}
        <Bookshelf position={[4.7, 0, -1]} rotation={[0, -Math.PI / 2, 0]} />
        <Bookshelf position={[4.7, 0, 1]} rotation={[0, -Math.PI / 2, 0]} />
        <Bookshelf position={[4.7, 0, 3]} rotation={[0, -Math.PI / 2, 0]} />

        {/* <Table position={[0, 0, 0]} /> */}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={1}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
};

export default BookstoreScene;
