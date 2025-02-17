import { DeliveryMethod } from "@/types/Delivery";
import BaseResponse from "@/types/response";
import { Checkout, Product, Transaction } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CheckoutResponse extends BaseResponse {
  data: Checkout;
}
interface CheckoutsResponse extends BaseResponse {
  data: {
    id: string;
    userId: string;
    productId: string;
    qty: number;
    pricePerItem: number;
    createAt: Date;
    updateAt: Date;
    product: Product;
  }[];
}

interface PaymentResponse extends BaseResponse {
  data: Transaction;
}

interface CheckoutPayload {
  productId: string | undefined;
  qty: number;
}

interface PaymentPayload {
  aplicationFee: number;
  asuranceFee: number;
  deliveryFee: number;
  deliveryType: DeliveryMethod;
}

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/transaction",
  }),
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Checkout"],
    }),
    checkouts: builder.query<CheckoutsResponse, void>({
      query: () => ({
        url: "/checkout",
      }),
      providesTags: ["Checkout"],
    }),
    payment: builder.mutation<PaymentResponse, PaymentPayload>({
      query: (body) => ({
        url: "/payment",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useCheckoutMutation, useCheckoutsQuery, usePaymentMutation } =
  transactionApi;
