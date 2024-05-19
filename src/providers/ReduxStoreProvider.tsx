"use client";
import { AppStore, setupStore } from "@/store/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};
export default function ReduxStoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
