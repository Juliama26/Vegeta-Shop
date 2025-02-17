import React from "react";
import { FaStar } from "react-icons/fa";

export default function RatingStar() {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar key={index} size={20} color="#FFD700" />
      ))}
    </div>
  );
}
