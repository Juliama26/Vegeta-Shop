"use client";
import React from "react";
import ImageBanner from "@/assets/image-banner.png";
import Image from "next/image";
import Title from "@/components/elements/Title";
import CardCategory from "@/components/fragments/CardCategory";
import CardProduct from "@/components/fragments/CardProduct";
import { useGetProductsQuery } from "@/service/product";
import { dataCategory } from "@/types/dataCategory";
import Subscribe from "@/components/fragments/Subscribe";

export default function ShopPage() {
  const { data, isLoading } = useGetProductsQuery({});
  return (
    <main>
      <Image
        src={ImageBanner}
        alt="banner"
        className="container mx-auto px-3 my-6 w-full h-[400px] object-cover"
      />
      <div className="container mx-auto px-3 my-12">
        <Title title="Produk Unggulan" />
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CardProduct
            product={data?.data.data.slice(0, 4) || []}
            isLoading={isLoading}
          />
        </section>
      </div>
      <div className="container mx-auto px-3 my-12">
        <Title title="Produk berdasarkan kategori" />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataCategory.map((item) => (
            <CardCategory
              key={item.id}
              title={item.name}
              href={item.url}
              icon={<Image src={item.icon} alt="buah" width={75} />}
            />
          ))}
        </section>
      </div>
      <div className="container mx-auto px-3 my-12">
        <Title title="Tentang Kami" />
        <section className="flex flex-col gap-4 text-accent">
          <p>
            Selamat datang di Vegeta, destinasi terbaik untuk aneka sayuran dan
            buah segar siap kirim ke seluruh Indonesia! Kami dengan bangga
            mempersembahkan diri sebagai tim yang berdedikasi untuk memberikan
            kualitas terbaik dan pilihan yang beragam untuk kebutuhan sayuran
            dan buah segar Anda.
          </p>
          <p>
            Kami berusaha untuk selalu memberikan pelayanan terbaik kepada
            pelanggan kami. Tim kami selalu siap membantu Anda dalam memilih
            aneka sayuran dan buah yang sesuai dengan kebutuhan dan preferensi
            Anda. Dengan sistem pengiriman yang efisien, produk-produk segar
            dari Vegeta akan tiba di depan pintu Anda dalam kondisi prima, siap
            untuk melengkapi hidangan sehat dan lezat Anda.
          </p>
          <p>
            Terima kasih atas kepercayaan Anda pada kami. Kami berharap Anda
            menikmati pengalaman berbelanja di situs kami dan menemukan
            produk-produk berkualitas tinggi yang akan melengkapi kehidupan
            sehat dan bahagia Anda. Jangan ragu untuk menghubungi tim kami jika
            Anda memerlukan bantuan atau memiliki pertanyaan. Bersama, mari kita
            jaga kesehatan dan kelezatan hidup dengan produk-produk berkualitas
            dari kami.
          </p>
        </section>
      </div>
      <Subscribe />
    </main>
  );
}
