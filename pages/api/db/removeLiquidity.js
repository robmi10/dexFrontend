import { client } from "../../../sanityClient/client";

const RemoveLiquidity = async (req, res) => {
  try {
    const poolTableId =
      req.body.liquidityowner + req.body.liquidityid + "poolTable";
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
        console.log({ res });
      });

    await client
      .patch(liquidityTableId)
      .set({
        StakeAmount: req.body.lptotalvalue,
      })
      .commit()
      .then((res) => {
        console.log({ res });
      });

    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default RemoveLiquidity;
