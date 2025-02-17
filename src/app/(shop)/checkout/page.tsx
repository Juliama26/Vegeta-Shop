"use client";
import { useState } from "react";
import Checkbox from "@/components/elements/Checkbox";
import ButtonCount from "@/components/fragments/ButtonCount";
import Button from "@/components/elements/Button";
import Subscribe from "@/components/fragments/Subscribe";
import { useCheckoutMutation, useCheckoutsQuery } from "@/service/transaction";
import DeliveryOption from "@/components/fragments/DeliveryOption";
import { DeliveryMethod } from "@/types/Delivery";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("HOME_DELIVERY");
  const [itemCount, setItemCount] = useState(1);

  const { data } = useCheckoutsQuery();
  const products = data?.data || [];

  const [mutaPayment] = useCheckoutMutation();

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };
  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  const totalItem = products.reduce((total, item) => total + item.qty, 0);
  const totalPrice = products.reduce(
    (total, item) => total + item.product.price * item.qty,
    0
  );

  const aplikasiFee = 1000;
  const asuranceFee = deliveryMethod === "HOME_DELIVERY" ? 1000 : 0;
  const deliveryFee = deliveryMethod === "HOME_DELIVERY" ? 20000 : 0;
  const totalBiaya = totalPrice + aplikasiFee + asuranceFee + deliveryFee;

  const handlePayment = async () => {
    try {
      const data = {
        aplicationFee: aplikasiFee,
        asuranceFee: asuranceFee,
        deliveryFee: deliveryFee,
        deliveryType: deliveryMethod,
      };
      await mutaPayment(data);
      alert("Pembayaran Berhasil");
    } catch (error) {
      return alert(error);
    }
  };

  return (
    <>
      <main className="container mx-auto px-3 py-6">
        <div className="flex justify-between gap-x-12">
          <section className="flex flex-col gap-y-6 w-full">
            <h3 className="text-2xl">Barang yang dibeli</h3>
            {products.map((item, index) => (
              <section
                key={index}
                className="flex items-center justify-between border-b"
              >
                <Checkbox
                  label={item.product.name}
                  name={item.product.name}
                  image={item.product.imageUrl}
                  price={item.product.price}
                />
                <section className="flex items-center gap-x-12">
                  <ButtonCount
                    ItemCount={item.qty}
                    Increment={handleIncrement}
                    Decrement={handleDecrement}
                  />
                  <Button title="Hapus" className="text-error" />
                </section>
              </section>
            ))}
            <hr className="border-b-2" />
            <DeliveryOption
              value={deliveryMethod}
              onChange={setDeliveryMethod}
            />
          </section>
          <aside className="max-w-md w-full p-3 flex flex-col gap-y-3 border rounded-xl">
            <h2 className="text-2xl">Ringkasan Belanja</h2>
            <h4 className="text-lg">Total Belanja</h4>
            <section className="grid grid-cols-2">
              <p>Total Harga {totalItem} Barang</p>
              <p className="text-right">Rp {totalPrice}</p>
              <p>Total Ongkos Kirim</p>
              <p className="text-right">Rp {deliveryFee}</p>
              <p>Asurannsi Pengiriman</p>
              <p className="text-right">Rp {asuranceFee}</p>
            </section>
            <hr className="border-b-2" />
            <h4 className="text-lg">Biaya Transaksi</h4>
            <section className="flex justify-between">
              <p>Biaya Jasa Aplikasi</p>
              <p className="font-semibold">Rp {aplikasiFee}</p>
            </section>
            <hr className="border-b-2" />
            <section className="flex justify-between">
              <p className="font-semibold text-lg">Total Tagihan</p>
              <p className="font-semibold">Rp {totalBiaya}</p>
            </section>
            <Button
              onClick={handlePayment}
              title="Lanjutkan Pembayaran"
              className="bg-success text-light w-full"
            />
          </aside>
        </div>
      </main>
      <Subscribe />
    </>
  );
}
