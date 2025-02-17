import React from "react";

export default function Skeleton() {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-accent/25 h-36 w-full rounded-lg"></div>
          <div className="bg-accent/25 h-6 w-3/4 mt-4 rounded"></div>
          <div className="bg-accent/25 h-4 w-1/2 mt-2 rounded"></div>
          <div className="bg-accent/25 h-4 w-3/4 mt-2 rounded"></div>
        </div>
      ))}
    </>
  );
}
