import Button from "@/components/elements/Button";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignupForm from "./SignupForm";

export default function page() {
  return (
    <div className="flex flex-col gap-y-6">
      <SignupForm />
      <section className="flex flex-col gap-y-3">
        <p className="text-center text-accent">atau</p>
        <Button icon={<FcGoogle size={25} />} title="Sign in with Google" />
        <Button
          icon={<FaFacebook size={25} className="text-info" />}
          title="Sign in with Facebook"
        />
        <section className="tracking-wider mt-3 text-accent">
          Sudah memiliki akun?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-info hover:opacity-75 transition-all ease-in-out duration-300"
          >
            Masuk
          </Link>
        </section>
      </section>
    </div>
  );
}
