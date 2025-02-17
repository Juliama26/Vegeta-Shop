"use client";
import React from "react";
import vegeta from "@/assets/logo-vegeta.png";
import Image from "next/image";
import Link from "next/link";
import Links from "../elements/Links";
import { signOut, useSession } from "next-auth/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare, FiLogOut, FiShoppingCart } from "react-icons/fi";

const manu = ["Tentang Kami", "Product", "Belanja"];

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b-2 py-4">
      <nav className="container mx-auto px-3 flex items-center justify-between">
        <Link href="/">
          <Image src={vegeta} alt="Vegeta" width={125} />
        </Link>
        <ul className="hidden md:flex gap-x-4 text-lg">
          <Link href="/">Beranda</Link>
          {manu.map((item, index) => (
            <li key={index}>
              <Link href={`/${item.replace(" ", "-").toLocaleLowerCase()}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
        {session?.user ? (
          <div className="flex items-center gap-x-4 text-lg">
            <FiMessageSquare
              size={20}
              className="cursor-pointer hidden md:block"
            />
            <IoMdNotificationsOutline
              size={25}
              className="cursor-pointer hidden md:block"
            />
            <Link href="/checkout">
              <FiShoppingCart size={23} />
            </Link>
            <section>
              <p className="text-sm">Hi, Apa Kabar?</p>
              <h2>{session.user.name}</h2>
            </section>
            <FiLogOut
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              size={23}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <section className=" flex gap-x-3">
            <Links href="/auth/signup" className="bg-success text-light">
              Daftar Sekarang
            </Links>
            <Links href="/auth/signin" className="bg-warning text-light">
              Masuk akun
            </Links>
          </section>
        )}
      </nav>
    </header>
  );
}
