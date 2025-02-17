"use client";
import React, { useState } from "react";
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import Button from "../elements/Button";
import Image from "next/image";
import Skeleton from "./Skelaton";
import { Product } from "@prisma/client";
import Link from "next/link";

interface CardProductProps {
  product: Product[];
  isLoading?: boolean;
}

export default function CardProduct({ product, isLoading }: CardProductProps) {
  const [like, setLike] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (productId: string) => {
    setLike((prevLike) => ({
      ...prevLike,
      [productId]: !prevLike[productId],
    }));
  };

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {product.map((item, index) => (
            <section
              key={index}
              className="flex flex-col justify-between border p-4 rounded-lg relative hover:shadow-sm hover:scale-105 transition-all ease-in-out duration-300"
            >
              <button
                onClick={() => toggleLike(item.id)}
                className="absolute top-4 right-4"
              >
                {like[item.id] ? (
                  <FaHeart size={20} className="text-error" />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </button>
              <Link href={`/product/detail/${item.id}`}>
                <Image
                  src={item.imageUrl}
                  alt="product"
                  width={300}
                  height={250}
                />
              </Link>
              <figcaption className="flex flex-col gap-y-2">
                <Link
                  href={`/product/detail/${item.id}`}
                  className="text-lg font-semibold"
                >
                  {item.name}
                </Link>
                <strong>Rp. {item.price}</strong>
                <p className="flex items-center gap-x-2">
                  <FaStar color="#FFC107" />
                  {item.rating} | <span>{item.itemSold} Terjual</span>
                </p>
                <Button
                  icon={<FaShoppingCart size={20} />}
                  title="Masuk Keranjang"
                  className="bg-success text-light"
                />
              </figcaption>
            </section>
          ))}
        </>
      )}
    </>
  );
}
