"use client";
import { useState } from "react";
import Checkbox from "../elements/Checkbox";
import Input from "../elements/Input";
import { dataCategory } from "@/types/dataCategory";

interface FilterProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export default function Filter({ value = [], onChange }: FilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>(value);

  const handleCategoryChange = (itemName: string, isChecked: boolean) => {
    const newCategory = isChecked
      ? [...selectedCategory, itemName]
      : selectedCategory.filter((val) => val !== itemName);

    setSelectedCategory(newCategory);
    onChange(newCategory);
  };

  return (
    <main className="max-w-xs w-full border-2 rounded-xl flex flex-col gap-y-3 p-4">
      <h2 className="text-2xl font-semibold">Filter</h2>
      <hr className="border-b-2" />
      <h3>Kategori</h3>
      {dataCategory.map((item) => (
        <Checkbox
          key={item.name}
          label={item.name}
          name={item.name}
          onCheckedChange={(isChecked) =>
            handleCategoryChange(item.url, isChecked)
          }
          checked={selectedCategory.includes(item.url)}
        />
      ))}
      {/*Price dan Rating Belum di integrasi */}
      <hr className="border-b-2" />
      <section className="flex flex-col gap-y-1">
        <h3>Harga Minimum</h3>
        <Input type="number" icon="Rp." className="pl-10 outline-none" />
        <h3>Harga Maximum</h3>
        <Input type="number" icon="Rp." className="pl-10 outline-none" />
      </section>
      <hr className="border-b-2" />
      <h3>Rating</h3>
      {[5, 4, 3, 2, 1].map((item) => (
        <Checkbox
          key={item}
          label={`${"⭐".repeat(item)}`}
          name={`${item}-bintang`}
        />
      ))}
    </main>
  );
}
