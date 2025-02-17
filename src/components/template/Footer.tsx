import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaPhone,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import logo from "@/assets/logo-vegeta.png";
import Image from "next/image";

export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <footer className="flex flex-col px-6 py-6 bg-warning bg-opacity-25">
      {/* <div className="flex flex-col md:flex-row md:justify-between gap-y-3"> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
        <section className="flex flex-col gap-y-3">
          <Image src={logo} alt="Vegeta" width={150} />
          <section className="flex gap-x-3">
            <FaFacebook size={25} color="#1877F2" />
            <FaTiktok size={25} color="#000" />
            <FaInstagram size={25} color="#E1306C" />
          </section>
          <section className="flex flex-col gap-y-2">
            <Link href="#" className="flex items-center gap-x-2">
              <FaPhone />
              <span>(0341) 4323332</span>
            </Link>
            <Link href="#" className="flex items-center gap-x-2">
              <MdOutlineMailOutline />
              <span>hi@vegeta.test</span>
            </Link>
            <Link href="#" className="flex items-center gap-x-2">
              <FaMapLocationDot />
              <span>Jl.Kamboja No. 12</span>
            </Link>
            <Link href="#" className="flex items-center gap-x-2">
              <FaRegCalendarAlt />
              <span>10.00-18.00, Senin-Minggu</span>
            </Link>
          </section>
        </section>
        <section>
          <h3 className="font-semibold py-2">Perusahaan</h3>
          <section className="flex flex-col gap-y-2">
            <Link href="/">Tentang Kami</Link>
            <Link href="/">Service</Link>
            <Link href="/">Studi Kasus</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Contact</Link>
          </section>
        </section>
        <section>
          <h3 className="font-semibold py-2">Akun</h3>
          <section className="flex flex-col gap-y-2">
            <Link href="/">Masuk</Link>
            <Link href="/">Lihat Keranjang</Link>
            <Link href="/">Favorit Saya</Link>
            <Link href="/">Pesanan Saya</Link>
            <Link href="/">Bandingkan Produk</Link>
          </section>
        </section>
      </div>
      <section className="flex justify-between mt-4 py-4 border-t-2 text-accent">
        <p>
          Copyright &copy; {year} <span className="text-warning">Vegeta</span> -
          All rights reserved
        </p>
        <p>
          Powered by{" "}
          <Link
            target="_blank"
            href={"https://juliamalaolii.vercel.app/"}
            className="text-info"
          >
            Juliama
          </Link>
        </p>
      </section>
    </footer>
  );
}
