"use client";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface ButtonCountProps {
  ItemCount: number;
  Increment: () => void;
  Decrement: () => void;
}

export default function ButtonCount({
  ItemCount,
  Increment,
  Decrement,
}: ButtonCountProps) {
  return (
    <section className="flex items-center gap-x-4">
      <FaMinus
        onClick={Decrement}
        size={15}
        className="cursor-pointer w-6 h-6 p-1 border-2 rounded text-accent"
      />
      <span>{ItemCount}</span>
      <FaPlus
        onClick={Increment}
        size={15}
        className="cursor-pointer w-6 h-6 p-1 border-2 rounded text-accent"
      />
    </section>
  );
}
