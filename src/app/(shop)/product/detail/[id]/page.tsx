"use client";
import { useState, use } from "react";
import Title from "@/components/elements/Title";
import CardProduct from "@/components/fragments/CardProduct";
import { useGetProductIdQuery, useGetProductsQuery } from "@/service/product";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import Button from "@/components/elements/Button";
import { useCheckoutMutation } from "@/service/transaction";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ButtonCount from "@/components/fragments/ButtonCount";

export default function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const route = useRouter();

  const [itemCount, setItemCount] = useState(1);
  const { data, isLoading } = useGetProductsQuery({});
  const unwrappedParams = use(params);
  const { data: productId } = useGetProductIdQuery(unwrappedParams.id);

  const [muteCheckout] = useCheckoutMutation({});
  const { data: session } = useSession();

  const handleAddToCard = async () => {
    if (!session?.user) {
      alert("Anda harus login terlebih dahulu");
      route.push("/auth/signin");
      return;
    }
    const item = {
      productId: productId?.data.id,
      qty: itemCount,
    };
    await muteCheckout(item);
    alert("Product added to cart");
    route.push("/checkout");
  };

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };
  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  return (
    <main className="container mx-auto px-3 py-6 flex flex-col gap-y-4">
      <section className="flex gap-x-6">
        <figure className="min-w-96 h-60 flex justify-center items-center border rounded-xl">
          {productId?.data.imageUrl ? (
            <Image
              src={productId?.data.imageUrl}
              alt="buah"
              width={350}
              height={350}
            />
          ) : null}
        </figure>
        <aside className="flex flex-col gap-y-2">
          <h4 className="text-success font-semibold text-lg">
            {productId?.data.category}
          </h4>
          <h1 className="text-3xl font-semibold">{productId?.data.name}</h1>
          <p>{productId?.data.itemSold} Terjual</p>
          <p className="text-2xl font-semibold">
            Rp {productId?.data.price} / kg
          </p>
          <p className="text-accent">{productId?.data.description}</p>
          <section className="flex items-center gap-x-4">
            <ButtonCount
              ItemCount={itemCount}
              Increment={handleIncrement}
              Decrement={handleDecrement}
            />
            <Button
              icon={<FaShoppingCart size={20} />}
              title="Masukkan Keranjang"
              className="bg-success text-light"
              onClick={handleAddToCard}
            />
            <Button
              icon={<CgShoppingBag size={20} />}
              title="Beli Sekarang"
              className="bg-warning text-light"
            />
          </section>
        </aside>
      </section>
      <hr className="border-b-2 text-accent" />
      <Title title="Produk Unggulan" />
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CardProduct
          product={data?.data.data.slice(4, 8) || []}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}
