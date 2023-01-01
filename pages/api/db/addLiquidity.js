import { client } from "../../../sanityClient/client";

const AddLiquidity = async (req, res) => {
  try {
    const poolTabeId = req.body.liquidityowner + req.body.liquidityid;
    const liquidityDoc = {
      _type: "liquidityTable",
      _id: req.body.liquidityowner + req.body.liquidityid,
      LiquidityId: req.body.liquidityid,
      LiquidityOwner: req.body.liquidityowner,
      Amount: req.body.amount,
      Token: req.body.token,
    };
    console.log({ liquidityDoc });
    await client.createOrReplace(liquidityDoc);
    console.log("Success!");
    await client
      .patch(poolTabeId)
      .set({
        TokenAmount: parseInt(req.body.tokenamount),
        EthAmount: parseInt(req.body.tokenamount),
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
