import React from "react";
import Link from "next/link";
import LinkProps from "@/types/Link";

export default function Links(props: LinkProps) {
  return (
    <Link
      href={props.href}
      className={`${props.className} flex items-center justify-center gap-x-2 px-4 py-2 rounded-lg`}
    >
      {props.children}
    </Link>
  );
}
