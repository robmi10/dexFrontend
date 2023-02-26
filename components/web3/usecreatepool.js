import { useContext, useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import dexInfo from "../../constants/Dex.json";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { DexAddress, DaiTokenAddress } from "../../address";
import { DexContext } from "../useContext/context";

const Webthreecreatepool = () => {
  const { setCreatePoolStatus, setLoading } = useContext(DexContext);
  const dexAddress = DexAddress;
  const daiAddress = DaiTokenAddress;
  const dexInterface = new ethers.utils.Interface(dexInfo.abi);
  const dexAddressContract = new Contract(dexAddress, dexInterface);
  const [input, setInput] = useState(false);
  const {
    state: createStatus,
    send: createPool,
    events: createEvents,
  } = useContractFunction(dexAddressContract, "createPool");

  useEffect(() => {
    if (createStatus.status === "Mining") {
      setLoading(true);
    }

    if (createStatus.status === "Success") {
      const { Token, _id } = input;

      setCreatePoolStatus({
        createdId: createEvents[0]?.args._id,
        createdBy: createEvents[0]?.args._createBy,
        createdToken: createEvents[0]?.args._token,
        tokenPair: Token,
        tokenId: _id,
        ethPair: "eth",
        lpaddress: "",
      });
    }
  }, [createStatus]);

  const Pool = async (data) => {
    setInput(data);
    createPool(daiAddress);
  };
  return { Pool };
};
export default Webthreecreatepool;
