"use client";

import { Provider as ReduxProvider } from "react-redux";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import { store } from "@/store";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
}

export default Provider;
