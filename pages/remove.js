import React, { useContext } from "react";
import { LiquidationRemove } from "../components/liquidation/liquidationremove";

import Modal from "../components/modal/modal";
import { DexContext } from "../components/useContext/context";
const Removeliquidation = () => {
  const { modal } = useContext(DexContext);
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <LiquidationRemove />;
      </div>
      {modal ? <Modal /> : null}
    </>
  );
};

export default Removeliquidation;
