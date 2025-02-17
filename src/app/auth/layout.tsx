import React from "react";
import Image from "next/image";
import vegeta from "@/assets/logo-vegeta.png";
import bgAuth from "@/assets/bg-authentication.jpg";
import bgAuthLeft from "@/assets/bg-authentication-left.jpg";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{ backgroundImage: `url(${bgAuth.src})`, backgroundSize: "cover" }}
      className="h-screen w-screen flex justify-center items-center"
    >
      <div className="w-[1154px] h-[675px] drop-shadow-xl rounded-3xl overflow-hidden flex bg-light">
        <div className="hidden md:flex relative">
          <div
            className="bg-carrot aspect-[443/758] flex justify-center items-center pr-[26px]"
            style={{
              backgroundImage: `url(${bgAuthLeft.src})`,
              backgroundSize: "cover",
            }}
          >
            <Link href={"/"}>
              <Image src={vegeta} alt="Vegeta" width={225} />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 md:ml-[-26px] z-10 justify-center items-center rounded-3xl bg-light">
          <section className="max-w-lg w-full px-3">{children}</section>
        </div>
      </div>
    </main>
  );
}
