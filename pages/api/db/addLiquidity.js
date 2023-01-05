import { client } from "../../../sanityClient/client";

const AddLiquidity = async (req, res) => {
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
      TokenReserve: req.body.tokenReserve,
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
        TokenReserve: req.body.tokenReserve,
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
