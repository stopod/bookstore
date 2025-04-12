import type { Route } from "./+types/home";
import BookstoreScene from "../bookstore/bookstore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <BookstoreScene />;
}
