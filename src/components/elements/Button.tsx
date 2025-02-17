import React from "react";
import ButtonProps from "@/types/button";

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} flex items-center justify-center gap-x-2 px-4 py-2 rounded-lg`}
    >
      {props.icon}
      <span>{props.title}</span>
    </button>
  );
}
