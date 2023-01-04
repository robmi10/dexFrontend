import { useEtherBalance } from "@usedapp/core";
import { client } from "../../../sanityClient/client";

const AddLiquidity = async (req, res) => {
  const etherBalance = useEtherBalance(req.body.token);
  console.log({ etherBalance });
  try {
    const liquidityDoc = {
      _type: "liquidityTable",
      _id:
        req.body.liquidityowner +
        req.body.liquidityid.toString() +
        +"liquidityTable",
      LiquidityId: req.body.liquidityid,
      LiquidityOwner: req.body.liquidityowner,
      StakeAmount: req.body.tokenamount,
      PoolAddress: req.body.token,
    };

    const poolTabeId =
      req.body.liquidityowner + req.body.liquidityid + "poolTable";

    await client.createOrReplace(liquidityDoc);
    console.log("Success!");
    await client
      .patch(poolTabeId)
      .set({
        TokenAmount: req.body.lptotalvalue,
        EthAmount: req.body.ethtotalvalue,
        LpAddress: req.body.lpaddress,
      })
      .commit()
      .then((res) => {
        console.log({ docProposeId: res });
      });

    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default AddLiquidity;
