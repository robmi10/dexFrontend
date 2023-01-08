import React, { useContext, useEffect } from "react";
import { LiquidationAdd } from "../../components/liquidation/liquidationadd";
import Modal from "../../components/modal/modal";
import { DexContext } from "../../components/useContext/context";

const Addliquidation = () => {
  const { modal } = useContext(DexContext);
  useEffect(() => {}, [modal]);
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <LiquidationAdd />
      </div>
      {modal ? <Modal /> : null}
    </>
  );
};

export default Addliquidation;
