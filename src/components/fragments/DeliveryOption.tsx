"use client";
import { DeliveryMethod } from "@/types/Delivery";
import { LiaCheckCircleSolid } from "react-icons/lia";
import Input from "../elements/Input";

interface DeliveryProps {
  value: DeliveryMethod;
  onChange: (value: DeliveryMethod) => void;
}

export default function DeliveryOption({ value, onChange }: DeliveryProps) { 
  return (
    <main className="flex flex-col gap-y-3">
      <h2 className="text-2xl">Pilihan Pengiriman</h2>
      <div className="flex gap-x-4">
        <section
          onClick={() => onChange("HOME_DELIVERY")}
          className={`flex flex-col gap-y-1 p-3 border rounded-md relative cursor-pointer ${
            value === "HOME_DELIVERY" && "border-success"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              value === "HOME_DELIVERY" && "text-warning"
            }`}
          >
            Home Delivery
          </h2>
          {value === "HOME_DELIVERY" && (
            <LiaCheckCircleSolid
              size={23}
              className="absolute top-3 right-3 text-success"
            />
          )}
          <p className="text-accent text-sm">
            Akan tiba maksimal pukul 17.00 WIB
          </p>
        </section>
        <section
          onClick={() => onChange("STORE_PICKUP")}
          className={`flex flex-col gap-y-1 p-3 border rounded-md relative cursor-pointer ${
            value === "STORE_PICKUP" && "border-success"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              value === "STORE_PICKUP" && "text-warning"
            }`}
          >
            Ambil di toko
          </h2>
          {value === "STORE_PICKUP" && (
            <LiaCheckCircleSolid
              size={23}
              className="absolute top-3 right-3 text-success"
            />
          )}
          <p className="text-accent text-sm">
            Ambil pesanan anda secara mandiri di store
          </p>
        </section>
      </div>
      {value === "HOME_DELIVERY" && (
        <>
          <h2 className="text-xl mt-3">Alamat Pengiriman</h2>
          <form className="flex flex-col gap-y-3">
            <Input placeholder="Nama Lengkap" />
            <Input placeholder="Nomor Telepon" />
            <textarea
              name="alamat"
              id="alamat"
              placeholder="Alamat Lengkap"
              className="w-full px-4 py-2 border-2 rounded-lg"
            ></textarea>
            <section className="grid grid-cols-2 gap-3">
              <Input placeholder="Provinsi" />
              <Input placeholder="Kabupaten/Kota" />
              <Input placeholder="Kecamatan" />
              <Input placeholder="Kode Pos" />
            </section>
          </form>
        </>
      )}
      {value === "STORE_PICKUP" && (
        <h2 className="text-xl text-center my-4">
          Mohon membawa bukti pembayaran. <br /> Terimakasih🙏
        </h2>
      )}
    </main>
  );
}
