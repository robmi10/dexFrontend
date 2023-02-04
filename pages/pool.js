import React, { useEffect, useContext } from "react";
import Createpool from "../components/liquidation/createpool";
import Modal from "../components/modal/modal";
import { DexContext } from "../components/useContext/context";

const Pool = () => {
  const { modal } = useContext(DexContext);
  useEffect(() => {}, [modal]);
  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center">
        {<Createpool />}
      </div>
      {modal ? <Modal /> : null}
    </>
  );
};

export default Pool;
