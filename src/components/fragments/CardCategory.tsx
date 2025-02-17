import React from "react";
import CardProps from "@/types/category";
import Link from "next/link";

export default function CardCategory(props: CardProps) {
  return (
    <Link
      href={`product?category=${props.href}`}
      className="flex items-center justify-center gap-x-3 border p-4 rounded-md w-full hover:shadow-sm hover:scale-105 transition-all ease-in-out duration-300"
    >
      {props.icon}
      <h2 className="text-2xl font-semibold">{props.title}</h2>
    </Link>
  );
}
