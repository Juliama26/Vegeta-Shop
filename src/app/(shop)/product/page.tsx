"use client";
import Title from "@/components/elements/Title";
import CardProduct from "@/components/fragments/CardProduct";
import { useGetProductsQuery } from "@/service/product";
import { Pagination } from "@/components/elements/Pagination";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "@/components/fragments/Fillter";

export default function ProductPage() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState(
    parseInt(searchParams.get("page") as string) || 1
  );
  const { data, isLoading } = useGetProductsQuery({
    page: searchParams.get("page") || undefined,
    category: searchParams.get("category") || undefined,
  });
  const { data: recommen, isLoading: isLoadRecommen } = useGetProductsQuery({});

  const changeFilter = (key: string, value: string) => {
    const newQuery: Record<string, string> = {};
    searchParams.forEach((param, key) => {
      newQuery[key] = param;
    });
    newQuery[key] = value;
    const urlParam = new URLSearchParams(newQuery).toString();
    route.replace(`/product?${urlParam}`);
  };

  useEffect(() => {
    changeFilter("page", activePage.toString());
  }, [activePage]);

  // const isEmptyData = !data?.data.data || data.data.data.length === 0;

  return (
    <main className="container mx-auto p-3 flex flex-col gap-y-4">
      <div className="flex gap-x-4">
        <Filter
          value={searchParams.get("category")?.split(",") || []}
          onChange={(selected) => {
            changeFilter("category", selected.join(","));
          }}
        />
        <div className="flex flex-col gap-y-3 w-full">
          <Title title="Daftar Produk" />

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardProduct
              product={data?.data.data || []}
              isLoading={isLoading}
            />
          </section>
          <Pagination
            page={activePage}
            total={data?.data.total ? Math.ceil(data.data.total / 9) : 1}
            onChange={(activePage) => setActivePage(activePage)}
          />
        </div>
      </div>
      <hr className="border-b-2" />
      <div className="flex flex-col w-full">
        <Title title="Kamu mungkin sukai" />
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CardProduct
            product={recommen?.data.data.slice(0, 4) || []}
            isLoading={isLoadRecommen}
          />
        </section>
      </div>
    </main>
  );
}
