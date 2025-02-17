import React from "react";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Image from "next/image";
import footerIlustration from "@/assets/footer-illustration.png";
import bgFooter from "@/assets/footer-bg.jpg";

export default function Subscribe() {
  return (
    <main
      style={{
        backgroundImage: `url(${bgFooter.src})`,
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-around items-center gap-y-3 py-6">
        <section className="flex flex-col gap-y-3">
          <h2 className="text-3xl font-semibold">
            Dapatkan berita terbaru dari kami
          </h2>
          <p className="text-xl text-accent">
            Mulai berbelanja dengan{" "}
            <span className="font-semibold text-warning">Vegeta</span>
          </p>
          <Input type="email" placeholder="Masukkan alamat email" />
          <Input type="number" placeholder="Masukkan nomor telepon" />
          <Button title="Subscribe" className="bg-warning" />
        </section>
        <Image src={footerIlustration} alt="Vegeta-ilustration" />
      </div>
    </main>
  );
}
