"use client";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "@/service/auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type formAuth = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string | undefined;
};

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match"),
});

export default function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formAuth>({
    resolver: yupResolver(schema),
  });

  const route = useRouter();
  const searchParams = useSearchParams();
  const [registerMutation] = useRegisterMutation();

  const onSubmit = async (data: formAuth) => {
    try {
      const res = await registerMutation(data).unwrap();

      if (res.message) {
        const user = await signIn("credentials", {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackUrl: searchParams.get("callbackUrl") || "/auth/signin",
          redirect: false,
        });
        route.push(user?.url || "/auth/signin");
        toast.success("Sign Up Successfully");
      } else {
        toast.error("Sign Up Failed");
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <h2 className="text-3xl md:text-4xl text-center my-4 font-semibold">
        Buat akun baru
      </h2>
      <Input
        type="text"
        placeholder="Nama Lengkap"
        {...register("name")}
        error={errors.name?.message}
      />
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
      <Input
        type="password"
        placeholder="Confirm Kata Sandi"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" title="Buat akun" className="bg-success" />
    </form>
  );
}
