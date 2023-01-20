import React, { useEffect, useContext } from "react";
import SquareLoader from "../components/animation/square/square";
import Modal from "../components/modal/modal";
import { Swap } from "../components/swap";
import { DexContext } from "../components/useContext/context";

const SwapIndex = () => {
  const { modal } = useContext(DexContext);
  useEffect(() => {}, [modal]);
  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center">
        {<Swap />}
      </div>
      {modal ? <Modal /> : null}
    </>
  );
};

export default SwapIndex;
