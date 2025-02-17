"use client";
import { useState } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface IconProps {
  page: number;
  total?: number;
  onChange: (activePage: number) => void;
}

export const Pagination: React.FC<IconProps> = ({
  page,
  total,
  onChange,
}: IconProps) => {
  const [activePage, setActivePage] = useState(page);

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <FiChevronsLeft
        size={22}
        onClick={() => {
          if (activePage <= 1) return;
          setActivePage(activePage - 1);
          onChange(activePage - 1);
        }}
        className="cursor-pointer"
      />
      <p>
        Halaman {activePage} {total && `/ ${total}`}
      </p>
      <FiChevronsRight
        size={22}
        onClick={() => {
          if (activePage >= (total || 1)) return;
          setActivePage(activePage + 1);
          onChange(activePage + 1);
        }}
        className="cursor-pointer"
      />
    </div>
  );
};
