import { client } from "../../../sanityClient/client";

const RemoveLiquidity = async (req, res) => {
  try {
    const poolTableId =
      req.body.liquidityowner + req.body.liquidityid + "poolTable";

    console.log("current total eth check->", req.body.ethtotalvalue);

    const liquidityTableId =
      req.body.liquidityowner + req.body.liquidityid + +"liquidityTable";
    await client
      .patch(poolTableId)
      .set({
        TokenAmount: req.body.lptotalvalue,
        EthAmount: req.body.ethtotalvalue,
        LpAddress: req.body.lpaddress,
      })
      .commit()
      .then((res) => {
        console.log("poolTableId Success!");
      });

    await client
      .patch(liquidityTableId)
      .set({
        StakeAmount: req.body.lptotalvalue,
      })
      .commit()
      .then((res) => {
        console.log("liquidityTableId Success!");
      });

    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default RemoveLiquidity;
