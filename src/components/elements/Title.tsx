import React from "react";

interface Props {
  title: string;
}

export default function Title(props: Props) {
  return (
    <h2 className="text-3xl font-semibold mb-4 text-success">{props.title}</h2>
  );
}
