import { useState, useEffect, useContext } from "react";
import Modal from "../components/modal/modal";
import { DexContext } from "../components/useContext/context";

export default function Home() {
  const { modal } = useContext(DexContext);
  useEffect(() => {}, [modal]);

  return <div className="h-screen w-screen bg-red-400"></div>;
}
