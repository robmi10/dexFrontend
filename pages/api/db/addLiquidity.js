import { client } from "../../../sanityClient/client";

const AddLiquidity = async (req, res) => {
  try {
    const liquidityDoc = {
      _type: "liquidityTable",
      _id: req.body.liquidityowner + req.body.liquidityid,
      LiquidityId: req.body.liquidityid,
      LiquidityOwner: req.body.liquidityowner,
      Amount: req.body.amount,
      Token: req.body.token,
    };
    console.log({ liquidityDoc });
    await client.createIfNotExists(liquidityDoc);
    console.log("Success !");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default AddLiquidity;
