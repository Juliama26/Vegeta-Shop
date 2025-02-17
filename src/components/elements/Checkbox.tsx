"use client";
import React from "react";
import CheckboxProps from "@/types/checkbox";
import Image from "next/image";

export default function Checkbox(props: CheckboxProps) {
  return (
    <section className="flex items-center gap-x-4">
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
        checked={props.checked}
        onChange={(e) => props.onCheckedChange?.(e.target.checked)}
        className="w-5 h-5"
      />
      {props.image ? (
        <Image
          src={props.image}
          alt="buah"
          width={75}
          height={75}
          className="rounded border"
        />
      ) : null}
      <section className="flex flex-col">
        <label htmlFor={props.name}>{props.label}</label>
        <p className="font-semibold">{props.price}</p>
      </section>
    </section>
  );
}
