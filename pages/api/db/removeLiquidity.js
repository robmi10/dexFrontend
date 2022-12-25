import { client } from "../../../sanityClient/client";

const RemoveLiquidity = async (req, res) => {
  try {
    const liquidityId = req.body.liquidityowner + req.body.liquidityid;

    await client
      .patch(liquidityId)
      .set({ Amount: req.body.amount })
      .commit()
      .then((res) => {
        console.log({ liquidityId: res });
      });
    console.log("Success !");
    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
    console.error(error);
  }
};

export default RemoveLiquidity;
