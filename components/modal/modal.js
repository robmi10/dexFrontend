import React, { useContext, useEffect, useState } from "react";
import { DexContext } from "../useContext/context";
import ModalSwap from "./modalSwap";
import ModalToken from "./modalToken";

const Modal = () => {
  const { modal, setModal, setActivePool, tokenlist, activePool } =
    useContext(DexContext);

  useEffect(() => {
    console.log({ modalCheck: modal });
  }, [modal, activePool]);

  return (
    <div className="fixed h-full w-full bg-black bg-opacity-75 top-0 left-0 flex justify-center items-center z-10">
      {modal === "swap" && <ModalSwap />}
      {modal === "token" && <ModalToken />}
    </div>
  );
};

export default Modal;
