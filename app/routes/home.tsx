import type { Route } from "./+types/home";
import BookstoreScene from "../bookstore/bookstore";

export function meta({}: Route.MetaArgs) {
  return [{ title: "bookstore" }];
}

export default function Home() {
  return <BookstoreScene />;
}
