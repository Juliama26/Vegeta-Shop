import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductResponse extends BaseResponse {
  data: {
    total: number;
    data: Product[];
  };
}
interface ProductIdResponse extends BaseResponse {
  data: Product;
}

interface ProductAPIParams {
  page?: string | undefined;
  category?: string | undefined;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductAPIParams>({
      query: ({ page, category }) => ({
        url: "/",
        params: {
          page: page || undefined,
          category: category || undefined,
        },
      }),
    }),
    getProductId: builder.query<ProductIdResponse, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductIdQuery } = productApi;
