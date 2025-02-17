"use client";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type formAuth = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export default function SigninForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formAuth>({
    resolver: yupResolver(schema),
  });

  const route = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: formAuth) => {
    try {
      const user = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") || "/",
        redirect: false,
      });

      if (!user?.error) {
        route.push(user?.url || "/");
        toast.success("Sign In Successfully");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <h2 className="text-3xl md:text-4xl text-center my-6 font-semibold">
        Masuk akun anda
      </h2>
      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Kata Sandi"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button type="submit" title="Masuk" className="bg-success" />
    </form>
  );
}
